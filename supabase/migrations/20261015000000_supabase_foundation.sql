-- ROVENTO Supabase foundation: preserve the existing database catalog and price records.
-- This migration deliberately does not overwrite product prices, active flags, or shipping settings.
-- Product IDs stay stable because order_items references them.

update public.products set name = 'BAR INTENSO' where id = 'bar-intenso';
update public.products set name = 'PREMIUM' where id = 'premium';
update public.products set name = 'جواد 18' where id = 'gold-18';
update public.products set name = 'GOLD 21' where id = 'gold-21';
update public.products set name = 'جواد 24' where id = 'gold-24';

create or replace function public.create_order(
  p_name text,
  p_phone text,
  p_governorate text,
  p_address text,
  p_notes text,
  p_items jsonb
) returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_fee integer := coalesce(
    (select (s.value #>> '{}')::integer from public.site_settings s where s.key = 'shipping_fee'),
    100
  );
  v_sub integer := 0;
  v_order public.orders;
  v_item jsonb;
  v_product public.products;
  v_price integer;
  v_qty integer;
  v_size integer;
begin
  if coalesce(length(trim(p_name)), 0) < 2
     or coalesce(length(trim(p_address)), 0) < 5
     or coalesce(length(trim(p_governorate)), 0) = 0 then
    raise exception 'بيانات العميل غير مكتملة';
  end if;

  if p_phone !~ '^01[0125][0-9]{8}$' then
    raise exception 'رقم الهاتف المصري غير صحيح';
  end if;

  if jsonb_typeof(p_items) <> 'array'
     or jsonb_array_length(p_items) = 0
     or jsonb_array_length(p_items) > 30 then
    raise exception 'قائمة المنتجات غير صحيحة';
  end if;

  if v_fee < 0 then
    raise exception 'إعدادات الشحن غير صحيحة';
  end if;

  insert into public.orders (
    user_id, customer_name, phone, governorate, address, notes, subtotal, shipping, total
  )
  values (
    (select auth.uid()), trim(p_name), p_phone, trim(p_governorate),
    trim(p_address), nullif(trim(p_notes), ''), 0, v_fee, 0
  )
  returning * into v_order;

  for v_item in select * from jsonb_array_elements(p_items) loop
    begin
      v_qty := (v_item->>'qty')::integer;
      v_size := (v_item->>'size')::integer;
    exception when others then
      raise exception 'بيانات المنتج غير صحيحة';
    end;

    select * into v_product
    from public.products p
    where p.id = v_item->>'id' and p.active;

    if not found
       or v_qty is null or v_qty < 1 or v_qty > 50
       or v_size not in (250, 500, 1000) then
      raise exception 'المنتج أو الكمية أو الوزن غير صالح';
    end if;

    v_price := case v_size
      when 250 then v_product.price_250
      when 500 then v_product.price_500
      else v_product.price_1000
    end;

    if v_price is null or v_price <= 0 then
      raise exception 'لا يوجد سعر معتمد لهذا المنتج والوزن';
    end if;

    insert into public.order_items (
      order_id, product_id, product_name, size, qty, unit_price
    )
    values (
      v_order.id, v_product.id, v_product.name, v_size, v_qty, v_price
    );

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
      from public.order_items oi
      where oi.order_id = v_order.id
    ), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.create_order(text, text, text, text, text, jsonb) from public;
grant execute on function public.create_order(text, text, text, text, text, jsonb) to anon, authenticated;
