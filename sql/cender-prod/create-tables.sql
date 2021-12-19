drop table orders_t;
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

DROP TABLE products_t;
CREATE TABLE products_t (
    id INT,
    name VARCHAR2(255),
    description VARCHAR2(255),
    logo VARCHAR2(255) NOT NULL,
    price INT NOT NULL,
    mnfrId INT NOT NULL,
    shape VARCHAR2(255) NOT NULL,
    pickups_id INT NOT NULL,
    constraint products_t_PK PRIMARY KEY (id));

DROP sequence products_t_ID_SEQ;
CREATE sequence products_t_ID_SEQ;

CREATE trigger BI_products_t_ID
  before insert on products_t
  for each row
begin
  select products_t_ID_SEQ.nextval into :NEW.id from dual;
end;
/

DROP TABLE pickups;
CREATE TABLE pickups (
    id INT,
    name VARCHAR2(255),
    constraint pickups_PK PRIMARY KEY (id));

DROP sequence pickups_ID_SEQ;
CREATE sequence pickups_ID_SEQ;

CREATE trigger BI_pickups_ID
  before insert on pickups
  for each row
begin
  select pickups_ID_SEQ.nextval into :NEW.id from dual;
end;
/

DROP TABLE Manufacturers;
CREATE TABLE Manufacturers (
    id INT,
    name VARCHAR2(255),
    newsId INT NOT NULL,
    constraint MANUFACTURERS_PK PRIMARY KEY (id));

DROP sequence MANUFACTURERS_ID_SEQ;
CREATE sequence MANUFACTURERS_ID_SEQ;

CREATE trigger BI_MANUFACTURERS_ID
  before insert on Manufacturers
  for each row
begin
  select MANUFACTURERS_ID_SEQ.nextval into :NEW.id from dual;
end;
/

DROP TABLE News;
CREATE TABLE News (
    id INT NOT NULL,
    news INT NOT NULL,
    created_at DATE NOT NULL,
    constraint NEWS_PK PRIMARY KEY (id));

DROP sequence NEWS_ID_SEQ;
CREATE sequence NEWS_ID_SEQ;

CREATE trigger BI_NEWS_ID
  before insert on News
  for each row
begin
  select NEWS_ID_SEQ.nextval into :NEW.id from dual;
end;
/


ALTER TABLE Manufacturers ADD CONSTRAINT Manufacturers_fk0 FOREIGN KEY (newsId) REFERENCES News(id);

ALTER TABLE products_t ADD CONSTRAINT products_t_fk0 FOREIGN KEY (mnfrId) REFERENCES Manufacturers(id);

ALTER TABLE products_t ADD CONSTRAINT products_t_fk1 FOREIGN KEY (pickups_id) REFERENCES pickups(id);

alter table orders_t add constraint orders_users_fk foreign key (user_id)
   references users_t(id);

alter table orders_t add constraint orders_products_fk foreign key (product_id)
    references products_t(id);
