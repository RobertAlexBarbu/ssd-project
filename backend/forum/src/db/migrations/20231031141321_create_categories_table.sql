-- migrate:up
create table category (
    id serial primary key ,
    name varchar(64) not null,
    forum_id integer references forum(id) on delete cascade
);

-- migrate:down
drop table category;
