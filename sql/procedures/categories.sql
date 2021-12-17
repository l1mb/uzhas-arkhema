create or replace package rent_categories as
    procedure add(
        in_name categories_t.name%type,
        in_description categories_t.description%type,
        out_category out sys_refcursor
    );
    procedure get_all(out_categories out sys_refcursor);
    procedure get_by_id(
        in_id categories_t.id%type,
        out_category out sys_refcursor
    );
end;
/

create or replace package body rent_categories as
    procedure add(
        in_name categories_t.name%type,
        in_description categories_t.description%type,
        out_category out sys_refcursor
    )
    as
        added_id categories_t.id%type;
        added_category sys_refcursor;
    begin
        insert into categories_t(name, description)
            values(in_name, in_description)
            returning id into added_id;
        commit;
        get_by_id(added_id, added_category);
        out_category := added_category;
    exception
        when others then
            rollback;
            raise;
    end;
    --
    procedure get_all(out_categories out sys_refcursor)
    as begin
        open out_categories for
            select * from categories_t;
    end;
    --
    procedure get_by_id(
        in_id categories_t.id%type,
        out_category out sys_refcursor
    )
    as begin
        open out_category for
            select * from categories_t
            where id = in_id;
    end;
end;
/
