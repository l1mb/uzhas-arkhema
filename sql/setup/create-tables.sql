drop table orders_products;
create table orders_products(
    order_id number not null,
    product_id number not null,
    constraint orders_products_unq unique(order_id, product_id)
);

drop table orders;
create table orders (
    id number generated always as identity,
    user_id number not null,
    phone varchar2(15),
    order_date date default sysdate,
    rent_start_date date not null,
    rent_end_date date not null,
    cost number(10, 4) not null,
    status varchar2(50) default 'notapproved',
    constraint orders_pk primary key (id),
    constraint orders_chk check (status in ('not approved', 'approved', 'rejected', 'completed'))
);

drop table users;
create table users (
	id number generated always as identity,
	username varchar2(50 char) unique not null,
	email varchar2(50 char) not null,
	password_hash varchar2(100 char) not null,
    role varchar2(10 char) default 'customer',
	constraint users_pk primary key (id),
    constraint users_chk check (role = 'admin' or role = 'customer')
);

drop table products;
create table products (
	id number generated always as identity,
	name varchar2(50 char) not null,
	description varchar2(200 char),
	price number(10, 4) not null,
	category_id number not null,
	vendor_id number not null,
	constraint products_pk primary key (id)
);

drop table categories;
create table categories (
	id number generated always as identity,
	name varchar2(50 char) not null,
	description varchar2(200 char),
	constraint categories_pk primary key (id)
);

drop table vendors;
create table vendors (
	id number generated always as identity,
	name varchar2(50 char) not null,
	constraint vendors_pk primary key (id)
);

alter table products add constraint products_categories_fk foreign key (category_id) references categories(id);
alter table products add constraint products_vendors_fk foreign key (vendor_id) references vendors(id);
alter table orders add constraint orders_users_fk foreign key (user_id) references users(id);
alter table orders_products add constraint orders_products_orders_fk foreign key (order_id) references orders(id);
alter table orders_products add constraint orders_products_products_fk foreign key (product_id) references products(id);
