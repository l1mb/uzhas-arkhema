create or replace package rent_categories as
    procedure add(
        in_name categories.name%type,
        in_description categories.description%type,
        out_category out sys_refcursor
    );
    procedure get_all(out_categories out sys_refcursor);
    procedure get_by_id(
        in_id categories.id%type,
        out_category out sys_refcursor
    );
end;
/

create or replace package body rent_categories as
    procedure add(
        in_name categories.name%type,
        in_description categories.description%type,
        out_category out sys_refcursor
    )
    as
        added_id categories.id%type;
        added_category sys_refcursor;
    begin
        insert into categories(name, description)
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
            select id, name, description
            from categories;
    end;
    --
    procedure get_by_id(
        in_id categories.id%type,
        out_category out sys_refcursor
    )
    as begin
        open out_category for
            select id, name, description
            from categories where id = in_id;
    end;
end;
/
