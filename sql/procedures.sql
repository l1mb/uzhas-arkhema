create or replace package util_package as
    procedure drop_table(table_name user_tables.table_name%type);
end;
/

create or replace package body util_package as
procedure drop_table(table_name user_tables.table_name%type) 
    is begin
        execute immediate 'DROP TABLE ' || table_name;
    exception
        when others then
          if sqlcode != -942 then
             raise;
          end if;
    end;
end;
/

create or replace package rent_package as
    procedure AddUser(
        email users.email%type,
        password_hash users.password_hash%type
    );
end;
/

create or replace package body rent_package as
    procedure AddUser(
        email users.email%type,
        password_hash users.password_hash%type
    )
    is begin
        insert into users(email, password_hash) values(email, password_hash);
        commit;
    exception
        when others then
            rollback;
            raise;
    end;
    --
end;
/
