-- insert into manufacturers(name) values ('fender');
-- insert into manufacturers(name) values ('ibanez');
-- insert into manufacturers(name) values ('jackson');
-- insert into manufacturers(name) values ('gibson');
-- insert into manufacturers(name) values ('squire');

create or replace package cender_news as
    procedure get_news(out_news out sys_refcursor);
    procedure create_news(
        in_manufacturer_id in manufacturers.id%type, 
        in_news in news.news%type);
    procedure update_news(
        in_news_id in news.id%type,
        in_news_news in news.news%type);
    procedure delete_news(
        in_news_id in news.id%type);
end;
/

create or replace package body cender_news 
    as
    procedure get_news(out_news out sys_refcursor)
    as begin
        open out_news for
            select *
            from news;
    end;

    procedure create_news(
        in_manufacturer_id in manufacturers.id%type, 
        in_news in news.news%type)
        as
            news_id news.id%type;
            company_name manufacturers.name%type;
        begin
            insert into news(news, mnfr_id) values (in_news, in_manufacturer_id);
            commit;       
    end;

    
    procedure update_news(
        in_news_id in news.id%type,
        in_news_news in news.news%type
        )
        as
        begin
            update news set news = in_news_news where id=in_news_id;
            commit;
    end;

    procedure delete_news(
        in_news_id in news.id%type
        )
        as
        begin
            delete news where id = in_news_id;
            commit;    
    end;   
end;
/
show errors;
