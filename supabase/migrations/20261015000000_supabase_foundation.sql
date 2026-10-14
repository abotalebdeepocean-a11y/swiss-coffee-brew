-- ROVENTO Supabase foundation: approved catalog prices and server-validated orders.
-- Apply in Supabase SQL Editor or through the Supabase CLI before enabling checkout.
-- Keep legacy product IDs so historical order_items foreign keys remain valid.

alter table public.products alter column price_250 drop not null;
alter table public.products alter column price_500 drop not null;
alter table public.products alter column price_1000 drop not null;

alter table public.products drop constraint if exists products_price_250_check;
alter table public.products drop constraint if exists products_price_500_check;
alter table public.products drop constraint if exists products_price_1000_check;
alter table public.products add constraint products_price_250_positive_or_null check (price_250 is null or price_250 > 0);
alter table public.products add constraint products_price_500_positive_or_null check (price_500 is null or price_500 > 0);
alter table public.products add constraint products_price_1000_positive_or_null check (price_1000 is null or price_1000 > 0);

-- Only values recorded as confirmed in the existing ROVENTO Supabase documentation remain purchasable.
update public.products
set price_250 = null, price_500 = null, price_1000 = 690, active = true, name = 'BAR INTENSO'
where id = 'bar-intenso';

update public.products
set price_250 = null, price_500 = 450, price_1000 = 890, active = true, name = 'PREMIUM'
where id = 'premium';

-- Catalog source of truth is the current five-product lineup. Keep old IDs to preserve foreign keys.
update public.products
set name = 'جواد 18', price_250 = null, price_500 = null, price_1000 = null, active = false
where id = 'gold-18';

update public.products
set name = 'GOLD 21', price_250 = null, price_500 = null, price_1000 = null, active = false
where id = 'gold-21';

update public.products
set name = 'جواد 24', price_250 = null, price_500 = null, price_1000 = null, active = false
where id = 'gold-24';

insert into public.site_settings (key, value)
values ('shipping_fee', '100'::jsonb)
on conflict (key) do update set value = excluded.value;

create or replace function public.create_order(
  p_name text, p_phone text, p_governorate text, p_address text, p_notes text, p_items jsonb
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  v_fee integer := coalesce((select (value)::text::integer from public.site_settings where key = 'shipping_fee'), 100);
  v_sub integer := 0;
  v_order public.orders;
  it jsonb;
  v_prod public.products;
  v_price integer;
  v_qty integer;
  v_size integer;
begin
  if coalesce(length(trim(p_name)),0) < 5
     or coalesce(length(trim(p_address)),0) < 10
     or coalesce(length(trim(p_governorate)),0) = 0 then
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
    v_qty := (it->>'qty')::integer;
    v_size := (it->>'size')::integer;
    select * into v_prod from public.products where id = it->>'id' and active;
    if not found or v_qty is null or v_qty < 1 or v_qty > 50 or v_size not in (250,500,1000) then
      raise exception 'invalid item';
    end if;
    v_price := case v_size when 250 then v_prod.price_250 when 500 then v_prod.price_500 else v_prod.price_1000 end;
    if v_price is null or v_price <= 0 then raise exception 'price not approved for selected size'; end if;
    insert into public.order_items (order_id, product_id, product_name, size, qty, unit_price)
    values (v_order.id, v_prod.id, v_prod.name, v_size, v_qty, v_price);
    v_sub := v_sub + v_price * v_qty;
  end loop;

  update public.orders
  set subtotal = v_sub, shipping = v_fee, total = v_sub + v_fee
  where id = v_order.id
  returning * into v_order;

  return jsonb_build_object(
    'order_id', v_order.id,
    'order_no', v_order.order_no,
    'subtotal', v_order.subtotal,
    'shipping', v_order.shipping,
    'total', v_order.total,
    'items', coalesce((
      select jsonb_agg(jsonb_build_object(
        'product_name', oi.product_name,
        'size', oi.size,
        'qty', oi.qty,
        'unit_price', oi.unit_price
      ) order by oi.id)
      from public.order_items oi where oi.order_id = v_order.id
    ), '[]'::jsonb)
  );
end $$;

revoke all on function public.create_order(text,text,text,text,text,jsonb) from public;
grant execute on function public.create_order(text,text,text,text,text,jsonb) to anon, authenticated;
