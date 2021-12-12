create or replace package rent_users as
    procedure AddUser(
        in_username users.username%type,
        in_email users.email%type,
        in_password_hash users.password_hash%type,
        out_user out sys_refcursor
    );
    procedure GetAllUsers(out_users out sys_refcursor);
    procedure GetUserByUsername(
        in_username users.username%type,
        out_user out sys_refcursor
    );
end;
/

create or replace package body rent_users as
    procedure AddUser(
        in_username users.username%type,
        in_email users.email%type,
        in_password_hash users.password_hash%type,
        out_user out sys_refcursor
    )
    as 
        added sys_refcursor;
    begin
        insert into users(username, email, password_hash) 
            values(in_username, in_email, in_password_hash);
        commit;
        GetUserByUsername(in_username, added);
        out_user := added;
    exception
        when others then
            rollback;
            raise;
    end;
    --
    procedure GetAllUsers(out_users out sys_refcursor)
    as begin
        open out_users for
            select id, username, email, password_hash
            from users;
    end;
    --
    procedure GetUserByUsername(
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
