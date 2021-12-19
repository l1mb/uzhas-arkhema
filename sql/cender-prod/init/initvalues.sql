
insert into pickups(name) values ('H-H');
insert into pickups(name) values ('S-H');
insert into pickups(name) values ('S-S-H');
insert into pickups(name) values ('S-S-S');
insert into pickups(name) values ('Y-A-H');



insert into manufacturers(name) values ('fender');
insert into manufacturers(name) values ('ibanez');
insert into manufacturers(name) values ('jackson');
insert into manufacturers(name) values ('gibson');
insert into manufacturers(name) values ('squire');

insert into products_t (name, description, logo, price, mnfrId, shape, pickups_id)
  values ('uan', 'cork', 'log', 14.88, 1, 'jazzmaster', 1);

select * from users_t;
select * from products_t;  
