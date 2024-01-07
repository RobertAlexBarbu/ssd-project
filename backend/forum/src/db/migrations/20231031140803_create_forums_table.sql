-- migrate:up
create table forum (
    id serial primary key,
    name varchar(64) not null
)

-- migrate:down
drop table forum;
