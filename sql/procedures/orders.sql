create or replace package rent_orders as
    procedure add(
        in_user_id orders.user_id%type,
        in_product_id orders.product_id%type,
        in_phone orders.phone%type,
        in_rent_start_date orders.rent_start_date%type,
        in_rent_end_date orders.rent_end_date%type,
        in_cost orders.cost%type,
        out_order out sys_refcursor
    );
    procedure get_all(
        out_orders out sys_refcursor
    );
    procedure get_by_id(
        in_id orders.id%type,
        out_order out sys_refcursor
    );
end;
/

create or replace package body rent_orders as
    procedure add(
        in_user_id orders.user_id%type,
        in_product_id orders.product_id%type,
        in_phone orders.phone%type,
        in_rent_start_date orders.rent_start_date%type,
        in_rent_end_date orders.rent_end_date%type,
        in_cost orders.cost%type,
        out_order out sys_refcursor
    )
    as
        added_id orders.id%type;
        added_order sys_refcursor;
    begin
        insert into orders(user_id, product_id, phone, rent_start_date, rent_end_date, cost)
            values(in_user_id, in_product_id, in_phone, in_rent_start_date, in_rent_end_date, in_cost)
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
            select o.id, o.user_id, p.name, o.cost, o.status, p.name,
            to_char(o.order_date) as order_date, 
            to_char(o.rent_start_date) as rent_start_date, 
            to_char(o.rent_end_date) as rent_end_date
            from orders o
            join products p on o.product_id = p.id
            join vendors v on p.vendor_id = v.id;
    end;
    --
    procedure get_by_id(
        in_id orders.id%type,
        out_order out sys_refcursor
    )
    as begin
        open out_order for
            select o.id, o.user_id, p.name, o.cost, o.status, v.name,
            to_char(o.order_date) as order_date, 
            to_char(o.rent_start_date) as rent_start_date, 
            to_char(o.rent_end_date) as rent_end_date
            from orders o
            join products p on o.product_id = p.id
            join vendors v on p.vendor_id = v.id
            where o.id = in_id;
    end;
end;
/
