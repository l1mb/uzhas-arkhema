DROP TABLE Products;
CREATE TABLE Products (
    id INT,
    name VARCHAR2(255),
    description VARCHAR2(255),
    logo VARCHAR2(255) NOT NULL,
    price INT NOT NULL,
    mnfrId INT NOT NULL,
    shape VARCHAR2(255) NOT NULL,
    pickupId INT NOT NULL,
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

DROP TABLE pickupId;
CREATE TABLE pickupId (
    id INT,
    name VARCHAR2(255),
    constraint PICKUPID_PK PRIMARY KEY (id));

DROP sequence PICKUPID_ID_SEQ;
CREATE sequence PICKUPID_ID_SEQ;

CREATE trigger BI_PICKUPID_ID
  before insert on pickupId
  for each row
begin
  select PICKUPID_ID_SEQ.nextval into :NEW.id from dual;
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
ALTER TABLE Products ADD CONSTRAINT Products_fk1 FOREIGN KEY (pickupId) REFERENCES pickupId(id);
