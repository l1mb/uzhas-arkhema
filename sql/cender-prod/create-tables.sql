
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

DROP TABLE Products;
CREATE TABLE Products (
    id INT,
    name VARCHAR2(255),
    description VARCHAR2(255),
    logo VARCHAR2(255) NOT NULL,
    price INT NOT NULL,
    mnfrId INT NOT NULL,
    shape VARCHAR2(255) NOT NULL,
    pickups INT NOT NULL,
    constraint PRODUCTS_PK PRIMARY KEY (id));

DROP sequence PRODUCTS_ID_SEQ;
CREATE sequence PRODUCTS_ID_SEQ;

CREATE trigger BI_PRODUCTS_ID
  before insert on Products
  for each row
begin
  select PRODUCTS_ID_SEQ.nextval into :NEW.id from dual;
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

ALTER TABLE Products ADD CONSTRAINT Products_fk0 FOREIGN KEY (mnfrId) REFERENCES Manufacturers(id);
ALTER TABLE Products ADD CONSTRAINT Products_fk1 FOREIGN KEY (pickups) REFERENCES pickups(id);
