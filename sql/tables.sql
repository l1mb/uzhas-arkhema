exec util_package.drop_table('users');
create table users (
	id number generated always as identity,
	email varchar2(50) unique not null,
	password_hash varchar2(100) not null,
	constraint users_pk primary key (id)
);
