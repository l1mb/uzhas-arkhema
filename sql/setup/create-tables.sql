drop table orders_t;
create table orders_t (
    id number generated always as identity,
    user_id number not null,
    product_id number not null,
    phone varchar2(15),
    order_date date default sysdate,
    rent_start_date date not null,
    rent_end_date date not null,
    status varchar2(50) default 'not approved',
    constraint orders_pk primary key (id),
    constraint orders_chk check (status in ('not approved', 'approved', 'rejected', 'completed'))
);

drop table users_t;
create table users_t (
	id number generated always as identity,
	username varchar2(50 char) unique not null,
	email varchar2(50 char) not null,
	password_hash varchar2(100 char) not null,
    role varchar2(10 char) default 'customer',
	constraint users_pk primary key (id),
    constraint users_chk check (role = 'admin' or role = 'customer')
);

drop table products_t;
create table products_t (
	id number generated always as identity,
	name varchar2(50 char) not null,
	description varchar2(200 char),
	price number(10, 4) not null,
	category_id number not null,
	vendor_id number not null,
    date_deleted date,
	constraint products_pk primary key (id)
);

drop table categories_t;
create table categories_t (
	id number generated always as identity,
	name varchar2(50 char) not null,
	constraint categories_pk primary key (id)
);

drop table vendors_t;
create table vendors_t (
	id number generated always as identity,
	name varchar2(50 char) not null,
	constraint vendors_pk primary key (id)
);

alter table products_t add constraint products_categories_fk foreign key
    (category_id) references categories_t(id);
alter table products_t add constraint products_vendors_fk foreign key
    (vendor_id) references vendors_t(id);
alter table orders_t add constraint orders_users_fk foreign key (user_id)
    references users_t(id);
alter table orders_t add constraint orders_products_fk foreign key (product_id)
    references products_t(id);


drop view orders_v;
create view orders_v as
    select o.id, o.user_id, p.name, o.status, v.name as vendor,
    to_char(o.order_date) as order_date,
    to_char(o.rent_start_date) as rent_start_date,
    to_char(o.rent_end_date) as rent_end_date
    from orders_t o
    join products_t p on o.product_id = p.id
    join vendors_t v on p.vendor_id = v.id;

drop view users_v;
create view users_v as
    select id, username, email, password_hash, role
    from users_t;

drop view products_v;
create view products_v as
    select p.id, p.name, p.description, p.price, c.name as category, v.name as vendor
    from products_t p
    join vendors_t v on p.vendor_id = v.id
    join categories_t c on p.category_id = c.id
    where date_deleted is not null;
