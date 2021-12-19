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
        begin
            insert into news(news) values (in_news);
            select id into news_id from news where news.news = in_news;
            insert into manufacturers(newsId) values (news_id);
        exception
            when others then
                rollback;
                raise;
        
    end;

    
    procedure update_news(
        in_news_id in news.id%type,
        in_news_news in news.news%type
        )
        as
        begin
            update news set news = in_news_news where id=in_news_id;
        exception
            when others then
                rollback;
                raise;
        
    end;

    procedure delete_news(
        in_news_id in news.id%type
        )
        as
        begin
            delete news where id = in_news_id;
        exception
            when others then
                rollback;
                raise;
    
    end;   
end;
/
show errors;
