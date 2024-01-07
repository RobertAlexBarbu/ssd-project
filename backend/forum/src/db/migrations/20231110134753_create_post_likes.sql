-- migrate:up
create table post_like (
    id serial primary key,
    user_id varchar references app_user(id) on delete cascade,
    post_id integer references post(id) on delete cascade
);

-- migrate:down
drop table post_like;
