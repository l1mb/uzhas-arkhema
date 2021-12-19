create or replace directory cender_xml as 'cender_dir';

create or replace package cender_utils as
    procedure export_table(in_table_name varchar2);
    procedure import_orders;
end;
/


create or replace package body cender_utils as
    procedure export_table(in_table_name varchar2)
    as 
        rc sys_refcursor;
        doc dbms_xmldom.domdocument;
        v_sql varchar2(500 char);
    begin
        v_sql := 'select * from cender.'|| in_table_name;
        open rc for v_sql;
        doc := dbms_xmldom.newdomdocument(xmltype(rc));
        dbms_xmldom.writetofile(doc, 'CENDER_XML/' || in_table_name || '.xml');
    end;
    --
    procedure import_orders
    as begin
        insert into orders_t (user_id, product_id, count, order_date, status)
        select ExtractValue(value(order_xml), '//USER_ID') as user_id,
               ExtractValue(value(order_xml), '//PRODUCT_ID') as product_id,
               ExtractValue(value(order_xml), '//COUNT') as count,
               ExtractValue(value(order_xml), '//ORDER_DATE') as order_date,
               ExtractValue(value(order_xml), '//STATUS') as status
        from table(xmlsequence(extract(xmltype(bfilename('CENDER_XML', '/import/orders.xml'),
            nls_charset_id('utf-8')),'/ROWSET/ROW'))) order_xml;
        commit;
    end;
end;
/
show errors;

begin
  cender_utils.import_orders;
end;
/


begin 
  cender_utils.export_table ('orders_t');
end;
/
