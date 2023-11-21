insert into shop_user (name) values ('David');

insert into cart (user_id, status)
values
  ((select id from shop_user limit 1), 'OPEN');

insert into cart_item (cart_id, product_id, count)
values
  ((select id from cart where status = 'OPEN' order by created_at desc limit 1), uuid_generate_v4(), 2),
  ((select id from cart where status = 'OPEN' order by created_at desc limit 1), uuid_generate_v4(), 1);

 -- -------------------------------
 
insert into cart (user_id, status)
values
  (uuid_generate_v4(), 'OPEN');


insert into cart_item (cart_id, product_id, count)
values
  ((select id from cart where status = 'OPEN' order by created_at desc limit 1), uuid_generate_v4(), 2),
  ((select id from cart where status = 'OPEN' order by created_at desc limit 1), uuid_generate_v4(), 3),
  ((select id from cart where status = 'OPEN' order by created_at desc limit 1), uuid_generate_v4(), 1);
  
-- -------------------------------
 
 insert into cart (user_id, status)
values
  (uuid_generate_v4(), 'ORDERED');

insert into cart_item (cart_id, product_id, count)
values ((select id from cart where status = 'ORDERED' order by created_at desc limit 1), uuid_generate_v4(), 5);