create or replace directory rent_xml as 'rent_dir';

create or replace package rent_utils as
    procedure export_table(in_table_name varchar2);
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
    procedure import_products
    as begin
        insert into rent.products_t (name, description, price, category_id, vendor_id)
        select ExtractValue(value(product_xml), '//NAME') as name,
               ExtractValue(value(product_xml), '//DESCRIPTION') as description,
               ExtractValue(value(product_xml), '//PRICE') as price,
               ExtractValue(value(product_xml), '//CATEGORY_ID') as category_id,
               ExtractValue(value(product_xml), '//VENDOR_ID') as vendor_id
        from table(xmlsequence(extract(xmltype(bfilename('RENT_XML', 'products.xml'),
            nls_charset_id('utf-8')),'/ROWSET/ROW'))) product_xml;
        commit;
    end;
end;
/
show errors

begin
    rent_utils.export_table('products');
end;
/
