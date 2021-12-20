create or replace package cender_manufacturers as
    procedure add(in_name manufacturers.name%type);
    procedure get_all(out_manufacturers out sys_refcursor);
end;
/

create or replace package body cender_manufacturers as
    procedure add(in_name manufacturers.name%type)
    as begin
        insert into manufacturers(name)
            values(in_name);
        commit;
    end;
    procedure get_all(out_manufacturers out sys_refcursor)
    as begin
        open out_manufacturers for
            select *
            from manufacturers;
    end;
end;
/
