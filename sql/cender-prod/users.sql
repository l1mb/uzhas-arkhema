create or replace package rent_users as
    procedure add(
        in_username users_t.username%type,
        in_email users_t.email%type,
        in_password_hash users_t.password_hash%type,
        out_user out sys_refcursor
    );
    procedure get_all(out_users out sys_refcursor);
    procedure get_by_id(
        in_id users_t.id%type,
        out_user out sys_refcursor
    );
    procedure get_by_username(
        in_username users_t.username%type,
        out_user out sys_refcursor
    );
    procedure get_orders(
        in_id users_t.id%type,
        out_orders out sys_refcursor
    );
end;
/

create or replace package body rent_users as
    procedure add(
        in_username users_t.username%type,
        in_email users_t.email%type,
        in_password_hash users_t.password_hash%type,
        out_user out sys_refcursor
    )
    as 
        users_count int;
        v_role users_t.role%type := 'customer';
        added_id users_t.id%type;
        added_user sys_refcursor;
    begin
        select count(username) into users_count from users_t;
        if users_count = 0 then
            v_role := 'admin';
        end if;
        insert into users_t(username, email, password_hash, role)
            values(in_username, in_email, in_password_hash, v_role)
            returning id into added_id;
        commit;
        get_by_id(added_id, added_user);
        out_user := added_user;
    exception
        when others then
            rollback;
            raise;
    end;
    --
    procedure get_all(out_users out sys_refcursor)
    as begin
        open out_users for
            select * from users_v;
    end;
    --
    procedure get_by_id(
        in_id users_t.id%type,
        out_user out sys_refcursor
    )
    as begin
        open out_user for
            select * from users_v
            where id = in_id;
    end;
    --
    procedure get_by_username(
        in_username users_t.username%type,
        out_user out sys_refcursor
    )
    as begin
        open out_user for
            select * from users_v
            where username = in_username;
    end;
    --
    procedure get_orders(
        in_id users_t.id%type,
        out_orders out sys_refcursor
    )
    as begin
        open out_orders for
            select * from orders_v
            where user_id = in_id;
    end;
end;
/
