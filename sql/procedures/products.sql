create or replace package rent_products as
    procedure add(
        in_name products.name%type,
        in_description products.description%type,
        in_price products.price%type,
        in_category_id products.category_id%type,
        in_vendor_id products.vendor_id%type,
        out_product out sys_refcursor
    );
    procedure delete_by_id(
        in_id products.id%type,
        out_product out sys_refcursor
    );
    procedure get_all(
        in_offset int,
        in_limit int,
        in_filter_by varchar2,
        in_filter_query varchar2,
        in_order_by varchar2,
        in_order_mode varchar2,
        out_products out sys_refcursor
    );
    procedure get_by_id(
        in_id products.id%type,
        out_product out sys_refcursor
    );
    procedure update_by_id(
        in_id products.id%type,
        in_name products.name%type,
        in_description products.description%type,
        in_price products.price%type,
        in_category_id products.category_id%type,
        in_vendor_id products.vendor_id%type,
        out_product out sys_refcursor
    );
end;
/

create or replace package body rent_products as
    procedure add(
        in_name products.name%type,
        in_description products.description%type,
        in_price products.price%type,
        in_category_id products.category_id%type,
        in_vendor_id products.vendor_id%type,
        out_product out sys_refcursor
    )
    as
        added_id products.id%type;
        added_product sys_refcursor;
    begin
        insert into products_table(name, description, price, category_id, vendor_id)
            values(in_name, in_description, in_price, in_category_id, in_vendor_id)
            returning id into added_id;
        commit;
        get_by_id(added_id, added_product);
        out_product := added_product;
    exception
        when others then
            rollback;
            raise;
    end;
    --
    procedure delete_by_id(
        in_id products.id%type,
        out_product out sys_refcursor
    )
    as begin
        get_by_id(in_id, out_product);
        update products_table set date_deleted = sysdate
        where id = in_id;
        commit;
    end;
    --
    procedure get_all(
        in_offset int,
        in_limit int,
        in_filter_by varchar2,
        in_filter_query varchar2,
        in_order_by varchar2,
        in_order_mode varchar2,
        out_products out sys_refcursor
    )
    as
        v_sql varchar2(500 char);
    begin
    v_sql := 'select p.id, p.name, p.description, p.price, c.name as category, v.name as vendor'
            ||' from products p'
            ||' join vendors v on p.vendor_id = v.id'
            ||' join categories c on p.category_id = c.id'
            ||' where '|| in_filter_by || ' like ''%'|| in_filter_query ||'%'''
            ||' order by '|| in_order_by ||' '|| in_order_mode
            ||' offset '|| in_offset ||' rows';
    if in_limit != -1 then
            v_sql := v_sql ||' fetch next '|| in_limit ||' rows only';
    end if;
        open out_products for v_sql;
    end;
    --
    procedure get_by_id(
        in_id products.id%type,
        out_product out sys_refcursor
    )
    as begin
        open out_product for
            select p.id, p.name, p.description, p.price, c.name as category, v.name as vendor
            from products p
            join vendors v on p.vendor_id = v.id
            join categories c on p.category_id = c.id
            where p.id = in_id;
    end;
    --
    procedure update_by_id(
        in_id products.id%type,
        in_name products.name%type,
        in_description products.description%type,
        in_price products.price%type,
        in_category_id products.category_id%type,
        in_vendor_id products.vendor_id%type,
        out_product out sys_refcursor
    )
    as
        updated_id products.id%type;
        updated_product sys_refcursor;
    begin
        update products_table
            set name = in_name, description = in_description,
                price = in_price, category_id = in_category_id,
                vendor_id = in_vendor_id 
        where id = in_id
        returning id into updated_id;
        commit;
        get_by_id(updated_id, updated_product);
        out_product := updated_product;
    end;
end;
/
