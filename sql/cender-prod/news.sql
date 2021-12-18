create or replace package cender_news as
    procedure get_news(out_news out sys_refcursor);
    procedure create_news(
        in_news in news.news%type,
        in_created_at in news.created_at%type);
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
        in_news in news.news%type,
        in_created_at in news.created_at%type
        )
        as
        begin
            insert into news(news, created_at) values (in_news, in_created_at);
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
