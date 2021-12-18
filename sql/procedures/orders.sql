create or replace package rent_orders as
    procedure add(
        in_user_id orders_t.user_id%type,
        in_product_id orders_t.product_id%type,
        in_phone orders_t.phone%type,
        in_rent_start_date orders_t.rent_start_date%type,
        in_rent_end_date orders_t.rent_end_date%type,
        out_order out sys_refcursor
    );
    procedure get_all(
        out_orders out sys_refcursor
    );
    procedure get_by_id(
        in_id orders_t.id%type,
        out_order out sys_refcursor
    );
    procedure set_status(
        in_id orders_t.id%type,
        in_status orders_t.status%type
    );
end;
/

create or replace package body rent_orders as
    procedure add(
        in_user_id orders_t.user_id%type,
        in_product_id orders_t.product_id%type,
        in_phone orders_t.phone%type,
        in_rent_start_date orders_t.rent_start_date%type,
        in_rent_end_date orders_t.rent_end_date%type,
        out_order out sys_refcursor
    )
    as
        added_id orders_t.id%type;
        added_order sys_refcursor;
    begin
        insert into orders_t(user_id, product_id, phone, rent_start_date, rent_end_date)
            values(in_user_id, in_product_id, in_phone, in_rent_start_date, in_rent_end_date)
            returning id into added_id;
        commit;
        get_by_id(added_id, added_order);
        out_order := added_order;
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
            select * from orders_v;
    end;
    --
    procedure get_by_id(
        in_id orders_t.id%type,
        out_order out sys_refcursor
    )
    as begin
        open out_order for
            select * from orders_v
            where id = in_id;
    end;
    --
    procedure set_status(
        in_id orders_t.id%type,
        in_status orders_t.status%type
    )
    as begin
        update orders_t set status = in_status
        where id = in_id;
        commit;
    end;
end;
/
