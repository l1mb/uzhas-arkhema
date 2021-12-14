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

alter table products add constraint products_category_fk foreign key (category_id) references categories(id);
alter table products add constraint products_vendor_fk foreign key (vendor_id) references vendors(id);
