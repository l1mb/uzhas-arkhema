create or replace package rent_products as
    procedure add(
        in_name products.name%type,
        in_description products.description%type,
        in_price products.price%type,
        in_category_id products.category_id%type,
        in_vendor_id products.vendor_id%type,
        out_product out sys_refcursor
    );
    procedure get_all(
        in_offset int,
        in_limit int,
        in_order_by varchar2,
        out_products out sys_refcursor
    );
    procedure get_by_id(
        in_id products.id%type,
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
        insert into products(name, description, price, category_id, vendor_id)
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
    procedure get_all(
        in_offset int,
        in_limit int,
        in_order_by varchar2,
        out_products out sys_refcursor
    )
    as
        v_sql varchar2(500 char);
    begin
    v_sql := 'select p.id, p.name, p.description, p.price, v.name as vendor, c.name as category'
            ||' from products p'
            ||' join vendors v on p.vendor_id = v.id'
            ||' join categories c on p.category_id = c.id'
            ||' order by '|| in_order_by
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
            select p.id, p.name, p.description, p.price, v.name as vendor, c.name as category
            from products p
            join vendors v on p.vendor_id = v.id
            join categories c on p.category_id = c.id
            where p.id = in_id;
    end;
end;
/
