create or replace package cender_pickups as
    procedure get_all(out_pickups out sys_refcursor);
end;
/

select * from pickups;

create or replace package body cender_pickups as
    procedure get_all(out_pickups out sys_refcursor)
    
    as begin
        open out_pickups for
            select *
            from pickup pickups;
    end;
end;
/
show errors;
