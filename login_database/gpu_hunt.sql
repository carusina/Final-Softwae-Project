create database gpu_hunt;
create table users(
	id varchar(20) not null default '비회원' primary key,
	password varchar(20) not null
);
insert into users values
('admin', 'admin');