create or replace directory rent_xml as 'rent_dir';

create or replace package rent_utils as
    procedure xml_export;
    procedure xml_import;
end;
/

create or replace package body rent_utils as
    procedure xml_export
    as 
        rc sys_refcursor;
        doc dbms_xmldom.domdocument;
    begin
        open rc for select * from rent.products_t;
        doc := dbms_xmldom.newdomdocument(xmltype(rc));
        dbms_xmldom.writetofile(doc, 'RENT_XML/products.xml');
    end;
    --
    procedure xml_import
    as begin
        insert into products_t (name, description, price, category_id, vendor_id)
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

begin
    rent_utils.xml_export;
end;
/

begin
    rent_utils.xml_import;
end;
/
select * from products_imported;
