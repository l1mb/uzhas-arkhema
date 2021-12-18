create or replace package rent_manufacturers as
    procedure add(
        in_name manufacturers_t.name%type,
        out_manufacturer out sys_refcursor
    );
    procedure get_all(out_manufacturers out sys_refcursor);
    procedure get_by_id(
        in_id manufacturers_t.id%type,
        out_manufacturer out sys_refcursor
    );
end;
/

create or replace package body rent_manufacturers as
    procedure add(
        in_name manufacturers_t.name%type,
        out_manufacturer out sys_refcursor
    )
    as
        added_id manufacturers_t.id%type;
        added_manufacturer sys_refcursor;
    begin
        insert into manufacturers_t(name)
            values(in_name)
            returning id into added_id;
        commit;
        get_by_id(added_id, added_manufacturer);
        out_manufacturer := added_manufacturer;
    exception
        when others then
            rollback;
            raise;
    end;
    --
    procedure get_all(out_manufacturers out sys_refcursor)
    as begin
        open out_manufacturers for
            select *
            from manufacturers_t;
    end;
    --
    procedure get_by_id(
        in_id manufacturers_t.id%type,
        out_manufacturer out sys_refcursor
    )
    as begin
        open out_manufacturer for
            select *
            from manufacturers_t
            where id = in_id;
    end;
end;
/
