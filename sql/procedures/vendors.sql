create or replace package rent_vendors as
    procedure add(
        in_name vendors_t.name%type,
        out_vendor out sys_refcursor
    );
    procedure get_all(out_vendors out sys_refcursor);
    procedure get_by_id(
        in_id vendors_t.id%type,
        out_vendor out sys_refcursor
    );
end;
/

create or replace package body rent_vendors as
    procedure add(
        in_name vendors_t.name%type,
        out_vendor out sys_refcursor
    )
    as
        added_id vendors_t.id%type;
        added_vendor sys_refcursor;
    begin
        insert into vendors_t(name)
            values(in_name)
            returning id into added_id;
        commit;
        get_by_id(added_id, added_vendor);
        out_vendor := added_vendor;
    exception
        when others then
            rollback;
            raise;
    end;
    --
    procedure get_all(out_vendors out sys_refcursor)
    as begin
        open out_vendors for
            select *
            from vendors_t;
    end;
    --
    procedure get_by_id(
        in_id vendors_t.id%type,
        out_vendor out sys_refcursor
    )
    as begin
        open out_vendor for
            select *
            from vendors_t
            where id = in_id;
    end;
end;
/
