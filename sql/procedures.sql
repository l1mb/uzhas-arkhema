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
    procedure GetUserByUsername(
        inUsername in users.username%type,
        id out users.id%type
    );
    procedure GetUsers;
end;
/

create or replace package body rent_package as
    procedure GetUserByUsername(
        inUsername in users.username%type,
        id out users.id%type
    )
    is begin
        select users.id into id from users where username = inUsername;
    exception
        when no_data_found then
            dbms_output.put_line(sqlerrm);
        when others then
            raise;
    end;
    --
    procedure GetUsers
    is 
    type user_t is record(
        id       users.id%type,
        username users.username%type
    );
    type var is table of user_t index by pls_integer;
    var1 var;
    begin
        select id, username bulk collect into var1 from users;
    end;
end;
/
