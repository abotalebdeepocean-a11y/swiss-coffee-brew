-- ROVENTO — Supabase schema (applied as migration "rovento_schema" on project osganvzmjisqsomjayyt)
create table public.products (
  id text primary key, name text not null,
  line text not null check (line in ('GOLD','ESPRESSO')),
  price_250 integer check (price_250 is null or price_250 > 0),
  price_500 integer check (price_500 is null or price_500 > 0),
  price_1000 integer check (price_1000 is null or price_1000 > 0),
  active boolean not null default true, sort_order integer not null default 0
);
alter table public.products enable row level security;
create policy "products are public" on public.products for select to anon, authenticated using (active);

create table public.site_settings (key text primary key, value jsonb not null);
alter table public.site_settings enable row level security;
create policy "settings are public" on public.site_settings for select to anon, authenticated using (true);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, email text, avatar_url text, phone text, governorate text, address text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "own profile select" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "own profile update" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_no bigint generated always as identity,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  phone text not null check (phone ~ '^01[0125][0-9]{8}$'),
  governorate text not null, address text not null, notes text,
  subtotal integer not null, shipping integer not null, total integer not null,
  status text not null default 'new' check (status in ('new','confirmed','shipped','delivered','cancelled')),
  created_at timestamptz not null default now()
);
create index orders_user_id_idx on public.orders(user_id);
alter table public.orders enable row level security;
create policy "own orders select" on public.orders for select to authenticated using ((select auth.uid()) = user_id);

create table public.order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null references public.products(id),
  product_name text not null,
  size integer not null check (size in (250,500,1000)),
  qty integer not null check (qty between 1 and 50),
  unit_price integer not null
);
create index order_items_order_id_idx on public.order_items(order_id);
alter table public.order_items enable row level security;
create policy "own order items select" on public.order_items for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = (select auth.uid())));

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'), new.email,
          coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'))
  on conflict (id) do nothing;
  return new;
end $$;
revoke all on function public.handle_new_user() from public, anon, authenticated;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Orders are created only through this RPC; prices and shipping are recomputed server-side.
create or replace function public.create_order(
  p_name text, p_phone text, p_governorate text, p_address text, p_notes text, p_items jsonb
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  v_fee integer := coalesce((select (value)::text::integer from public.site_settings where key = 'shipping_fee'), 100);
  v_sub integer := 0; v_order public.orders; it jsonb; v_prod public.products; v_price integer; v_qty integer; v_size integer;
begin
  if coalesce(length(trim(p_name)),0) < 5 or coalesce(length(trim(p_address)),0) < 10 or coalesce(length(trim(p_governorate)),0) = 0 then
    raise exception 'invalid customer data';
  end if;
  if p_phone !~ '^01[0125][0-9]{8}$' then raise exception 'invalid phone'; end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 or jsonb_array_length(p_items) > 30 then
    raise exception 'invalid items';
  end if;
  insert into public.orders (user_id, customer_name, phone, governorate, address, notes, subtotal, shipping, total)
  values ((select auth.uid()), trim(p_name), p_phone, trim(p_governorate), trim(p_address), nullif(trim(p_notes),''), 0, v_fee, 0)
  returning * into v_order;
  for it in select * from jsonb_array_elements(p_items) loop
    v_qty := (it->>'qty')::integer; v_size := (it->>'size')::integer;
    select * into v_prod from public.products where id = it->>'id' and active;
    if not found or v_qty is null or v_qty < 1 or v_qty > 50 or v_size not in (250,500,1000) then raise exception 'invalid item'; end if;
    v_price := case v_size when 250 then v_prod.price_250 when 500 then v_prod.price_500 else v_prod.price_1000 end;
    if v_price is null or v_price <= 0 then raise exception 'price not approved for selected size'; end if;
    insert into public.order_items (order_id, product_id, product_name, size, qty, unit_price)
    values (v_order.id, v_prod.id, v_prod.name, v_size, v_qty, v_price);
    v_sub := v_sub + v_price * v_qty;
  end loop;
  update public.orders set subtotal = v_sub, total = v_sub + v_fee where id = v_order.id returning * into v_order;
  return jsonb_build_object(
    'order_id', v_order.id, 'order_no', v_order.order_no,
    'subtotal', v_order.subtotal, 'shipping', v_order.shipping, 'total', v_order.total,
    'items', coalesce((select jsonb_agg(jsonb_build_object('product_name', oi.product_name, 'size', oi.size, 'qty', oi.qty, 'unit_price', oi.unit_price) order by oi.id) from public.order_items oi where oi.order_id = v_order.id), '[]'::jsonb)
  );
end $$;
revoke all on function public.create_order(text,text,text,text,text,jsonb) from public;
grant execute on function public.create_order(text,text,text,text,text,jsonb) to anon, authenticated;

insert into public.site_settings (key, value) values ('shipping_fee', '100'::jsonb);
insert into public.products (id,name,line,price_250,price_500,price_1000,active,sort_order) values
 ('gold-18','جواد 18','GOLD',null,null,null,false,1),('gold-21','GOLD 21','GOLD',null,null,null,false,2),
 ('gold-24','جواد 24','GOLD',null,null,null,false,3),('premium','PREMIUM','ESPRESSO',null,450,890,true,4),
 ('bar-intenso','BAR INTENSO','ESPRESSO',null,null,690,true,5);
