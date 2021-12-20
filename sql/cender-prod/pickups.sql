create or replace package cender_pickups as
    procedure add(in_name pickups.name%type);
    procedure get_all(out_pickups out sys_refcursor);
end;
/

create or replace package body cender_pickups as
    procedure add(in_name pickups.name%type)
    as begin
        insert into pickups(name)
            values(in_name);
        commit;
    end;
    procedure get_all(out_pickups out sys_refcursor)
    as begin
        open out_pickups for
            select *
            from pickups;
    end;
end;
/
show errors;
