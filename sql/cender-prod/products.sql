create or replace package cender_products as
    procedure add(
        in_name products_t.name%type,
        in_description products_t.description%type,
        in_logo products_t.logo%type,
        in_price products_t.price%type,
        in_mnfr_id products_t.mnfr_id%type,
        in_shape products_t.shape%type,
        in_pickups_id products_t.pickups_id%type
    );
    procedure delete_by_id(in_id products_t.id%type);
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
        in_id products_t.id%type,
        out_product out sys_refcursor
    );
    procedure get_count(out_count out number);
    procedure update_by_id(
        in_id products_t.id%type,
        in_name products_t.name%type,
        in_description products_t.description%type,
        in_logo products_t.logo%type,
        in_price products_t.price%type,
        in_mnfr_id products_t.mnfr_id%type,
        in_shape products_t.shape%type,
        in_pickups_id products_t.pickups_id%type
    );
end;
/

create or replace package body cender_products as
    procedure add(
        in_name products_t.name%type,
        in_description products_t.description%type,
        in_logo products_t.logo%type,
        in_price products_t.price%type,
        in_mnfr_id products_t.mnfr_id%type,
        in_shape products_t.shape%type,
        in_pickups_id products_t.pickups_id%type
    )
    as begin
        insert into products_t(name, description, logo, price, mnfr_id, shape,
                               pickups_id)
            values(in_name, in_description,in_logo, in_price, in_mnfr_id,
                   in_shape, in_pickups_id);
        commit;
    end;
    --
    procedure delete_by_id(in_id products_t.id%type)
    as begin
        delete products_t
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
    v_sql := 'select *'
            ||' from products_t p'
            ||' where '|| in_filter_by || ' like ''%'
            || in_filter_query ||'%'' collate binary_ci'
            ||' order by '|| in_order_by ||' '|| in_order_mode
            ||' offset '|| in_offset ||' rows';
    if in_limit != -1 then
            v_sql := v_sql ||' fetch next '|| in_limit ||' rows only';
    end if;
        open out_products for v_sql;
    end;
    --
    procedure get_by_id(
        in_id products_t.id%type,
        out_product out sys_refcursor
    )
    as begin
        open out_product for
            select * from products_t
            where id = in_id;
    end;
    --
    procedure get_count(out_count out number)
    as begin
        select count(id) into out_count from products_t;
    end;
    --
    procedure update_by_id(
        in_id products_t.id%type,
        in_name products_t.name%type,
        in_description products_t.description%type,
        in_logo products_t.logo%type,
        in_price products_t.price%type,
        in_mnfr_id products_t.mnfr_id%type,
        in_shape products_t.shape%type,
        in_pickups_id products_t.pickups_id%type
    )
    as begin
        update products_t
            set name = in_name, description = in_description, logo = in_logo,
            price = in_price, mnfr_id = in_mnfr_id, shape = in_shape,
            pickups_id = in_pickups_id 
        where id = in_id;
        commit;
    end;
end;
/
