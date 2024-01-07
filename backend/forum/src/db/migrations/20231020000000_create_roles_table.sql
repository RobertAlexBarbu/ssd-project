-- migrate:up
create table role (
    id serial primary key ,
    name varchar(32) not null unique
);
insert into role (name)
values ('user'), ('admin'), ('super');

-- migrate:down
drop table role;
