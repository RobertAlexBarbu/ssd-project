-- migrate:up
create table comment (
    id serial primary key,
    user_id varchar references app_user(id) on delete set null,
    content text not null,
    post_id integer references post(id) on delete cascade,
    created_at timestamp default current_timestamp
);

-- migrate:down
drop table comment;
