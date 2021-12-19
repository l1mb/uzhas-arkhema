drop role rl_cender;
create role rl_cender;
grant create session,
    create table,
    create view,
    create procedure 
    to rl_cender;
drop profile pf_cender;
create profile pf_cender limit
    password_life_time 180
    sessions_per_user unlimited
    failed_login_attempts 7
    password_lock_time 1
    password_reuse_time 10
    password_grace_time default
    connect_time 180
    idle_time 30;
drop user cender;
create user cender identified by 11
    default tablespace cender_ts
    quota unlimited on cender_ts
    profile pf_cender
    account unlock;
grant rl_cender to cender;

select * from dba_ts_quotas 
    where username = 'cender' 
    and tablespace_name = 'cender_ts';

--blind user

drop role rl_cender_yan;
create role rl_cender_yan;
grant create session,
    create table,
    create view,
    create procedure 
    to rl_cender_yan;
drop profile pf_cender_yan;
create profile pf_cender_yan limit
    password_life_time 180
    sessions_per_user unlimited
    failed_login_attempts 7
    password_lock_time 1
    password_reuse_time 10
    password_grace_time default
    connect_time 180
    idle_time 30;
drop user cender_yan;
create user cender_yan identified by 11
    default tablespace cender_ts
    quota unlimited on cender_ts
    profile pf_cender_yan
    account unlock;
grant rl_cender_yan to cender_yan;

select * from dba_ts_quotas 
    where username = 'cender' 
    and tablespace_name = 'cender_ts';
