-- migrate:up
create table post (
    id serial primary key,
    title varchar(128) not null,
    content text not null,
    created_at timestamp default current_timestamp,
    category_id integer references category(id) on delete set null,
    user_id varchar references app_user(id) on delete set null,
    forum_id integer references forum(id) on delete cascade,
    likes integer default 0
);

-- migrate:down
drop table post;
