create or replace package cender_orders as
    procedure add(
        in_user_id orders_t.user_id%type,
        in_product_id orders_t.product_id%type,
        in_count orders_t.count%type
    );
    procedure get_all(
        out_orders out sys_refcursor
    );
    procedure get_by_id(
        in_id orders_t.id%type,
        out_order out sys_refcursor
    );
    procedure update_by_id(
        in_id orders_t.id%type,
        in_user_id orders_t.user_id%type,
        in_product_id orders_t.product_id%type,
        in_count orders_t.count%type,
        out_order out sys_refcursor
    );
    procedure delete_by_id(
        in_id orders_t.id%type
    );
end;
/

create or replace package body cender_orders as
    procedure add(
        in_user_id orders_t.user_id%type,
        in_product_id orders_t.product_id%type,
        in_count orders_t.count%type
    )
    as begin
        insert into orders_t(user_id, product_id, count)
            values(in_user_id, in_product_id, in_count);
        commit;
    exception
        when others then
            rollback;
            raise;
    end;
    --
    procedure get_all(
        out_orders out sys_refcursor
    )
    as begin
        open out_orders for
            select * from orders_t;
    end;
    --
    procedure get_by_id(
        in_id orders_t.id%type,
        out_order out sys_refcursor
    )
    as begin
        open out_order for
            select * from orders_t
            where id = in_id;
    end;
    --
    procedure update_by_id(
        in_id orders_t.id%type,
        in_user_id orders_t.user_id%type,
        in_product_id orders_t.product_id%type,
        in_count orders_t.count%type,
        out_order out sys_refcursor
    )
    as begin
        update orders_t set user_id = in_user_id, product_id = in_product_id,
            count = in_count
        where id = in_id;
        commit;
    end;
    --
    procedure delete_by_id(
        in_id orders_t.id%type
    )
    as begin
        delete orders_t 
        where id = in_id;
    end;
end;
/
