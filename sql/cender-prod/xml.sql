create or replace directory rent_xml as 'rent_dir';

create or replace package rent_utils as
    procedure export_table(in_table_name varchar2);
    procedure import_users;
    procedure import_manufacturers;
    procedure import_categories;
    procedure import_products;
end;
/

create or replace package body rent_utils as
    procedure export_table(in_table_name varchar2)
    as 
        rc sys_refcursor;
        doc dbms_xmldom.domdocument;
        v_sql varchar2(500 char);
    begin
        v_sql := 'select * from rent.'|| in_table_name ||'_t';
        open rc for v_sql;
        doc := dbms_xmldom.newdomdocument(xmltype(rc));
        dbms_xmldom.writetofile(doc, 'RENT_XML/' || in_table_name || '.xml');
    end;
    --
    procedure import_users
    as begin
        insert into users_t (username, email, password_hash, role)
        select ExtractValue(value(user_xml), '//USERNAME') as username,
               ExtractValue(value(user_xml), '//EMAIL') as email,
               ExtractValue(value(user_xml), '//PASSWORD_HASH') as password_hash,
               ExtractValue(value(user_xml), '//ROLE') as role
        from table(xmlsequence(extract(xmltype(bfilename('RENT_XML', '/import/users.xml'),
            nls_charset_id('utf-8')),'/ROWSET/ROW'))) user_xml;
        commit;
    end;
    --
    procedure import_manufacturers
    as begin
        insert into manufacturers_t (name)
        select ExtractValue(value(manufacturer_xml), '//NAME') as name
        from table(xmlsequence(extract(xmltype(bfilename('RENT_XML', '/import/manufacturers.xml'),
            nls_charset_id('utf-8')),'/ROWSET/ROW'))) manufacturer_xml;
        commit;
    end;
    --
    procedure import_categories
    as begin
        insert into categories_t(name)
        select ExtractValue(value(category_xml), '//NAME') as name
        from table(xmlsequence(extract(xmltype(bfilename('RENT_XML', '/import/categories.xml'),
            nls_charset_id('utf-8')),'/ROWSET/ROW'))) category_xml;
        commit;
    end;
    --
    procedure import_products
    as begin
        insert into products_t (name, description, price, category_id, manufacturer_id, date_deleted)
        select ExtractValue(value(product_xml), '//NAME') as name,
               ExtractValue(value(product_xml), '//DESCRIPTION') as description,
               ExtractValue(value(product_xml), '//PRICE') as price,
               ExtractValue(value(product_xml), '//CATEGORY_ID') as category_id,
               ExtractValue(value(product_xml), '//manufacturer_ID') as manufacturer_id,
               ExtractValue(value(product_xml), '//DATE_DELETED') as date_deleted
        from table(xmlsequence(extract(xmltype(bfilename('RENT_XML', '/import/products.xml'),
            nls_charset_id('utf-8')),'/ROWSET/ROW'))) product_xml;
        commit;
    end;
end;
/
show errors;

-- begin
--     rent_utils.export_table('users');
-- end;
-- /

begin
    rent_utils.import_categories;
    rent_utils.import_manufacturers;
    rent_utils.import_users;
    rent_utils.import_products;
end;
/
