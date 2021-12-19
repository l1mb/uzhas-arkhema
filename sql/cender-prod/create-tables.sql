drop table orders_t cascade constraints;
create table orders_t (
    id number generated always as identity,
    user_id number not null,
    product_id number not null,
    count number,
    order_date date default sysdate,
    status varchar2(50) default 'in progress',
    constraint orders_pk primary key (id),
    constraint orders_chk check (status in ('in progress', 'completed'))
);


drop table users_t cascade constraints;
create table users_t (
    id number generated always as identity,
    username varchar2(50 char) unique not null,
    email varchar2(50 char) not null,
    password_hash varchar2(100 char) not null,
    role varchar2(10 char) default 'customer',
    constraint users_pk primary key (id),
    constraint users_chk check (role = 'admin' or role = 'customer')
);

DROP TABLE products_t cascade constraints;
CREATE TABLE products_t (
    id number generated always as identity,
    name VARCHAR2(255),
    description VARCHAR2(255),
    logo VARCHAR2(255) NOT NULL,
    price INT NOT NULL,
    mnfrId INT NOT NULL,
    shape VARCHAR2(255) NOT NULL,
    pickups_id INT NOT NULL,
    constraint products_t_PK PRIMARY KEY (id));


DROP TABLE pickups cascade constraints;
CREATE TABLE pickups (
    id number generated always as identity,
    name VARCHAR2(255),
    constraint pickups_PK PRIMARY KEY (id));


DROP TABLE Manufacturers cascade constraints;
CREATE TABLE Manufacturers (
    id number generated always as identity,
    name VARCHAR2(255),
    constraint MANUFACTURERS_PK PRIMARY KEY (id));


DROP TABLE News cascade constraints;
CREATE TABLE News (
    id number generated always as identity,
    mnfrId number not null,
    news varchar2(255) NOT NULL,
    created_at date default sysdate,
    constraint NEWS_PK PRIMARY KEY (id));


ALTER TABLE news ADD CONSTRAINT news_fk0 FOREIGN KEY (mnfrId) REFERENCES Manufacturers(id);

ALTER TABLE products_t ADD CONSTRAINT products_t_fk0 FOREIGN KEY (mnfrId) REFERENCES Manufacturers(id);

ALTER TABLE products_t ADD CONSTRAINT products_t_fk1 FOREIGN KEY (pickups_id) REFERENCES pickups(id);

alter table orders_t add constraint orders_users_fk foreign key (user_id)
   references users_t(id);

alter table orders_t add constraint orders_products_fk foreign key (product_id)
    references products_t(id);