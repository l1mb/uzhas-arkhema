create or replace package rent_users as
    procedure add(
        in_username users.username%type,
        in_email users.email%type,
        in_password_hash users.password_hash%type,
        out_user out sys_refcursor
    );
    procedure get_all(out_users out sys_refcursor);
    procedure get_by_id(
        in_id users.id%type,
        out_user out sys_refcursor
    );
    procedure get_by_username(
        in_username users.username%type,
        out_user out sys_refcursor
    );
end;
/

create or replace package body rent_users as
    procedure add(
        in_username users.username%type,
        in_email users.email%type,
        in_password_hash users.password_hash%type,
        out_user out sys_refcursor
    )
    as 
        added_id users.id%type;
        added_user sys_refcursor;
    begin
        insert into users(username, email, password_hash) 
            values(in_username, in_email, in_password_hash)
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
            select id, username, email, password_hash, role
            from users;
    end;
    --
    procedure get_by_id(
        in_id users.id%type,
        out_user out sys_refcursor
    )
    as begin
        open out_user for
            select id, username, email, password_hash, role
            from users where id = in_id;
    end;
    --
    procedure get_by_username(
        in_username users.username%type,
        out_user out sys_refcursor
    )
    as begin
        open out_user for
            select id, username, email, password_hash
            from users where username = in_username;
    end;
end;
/
