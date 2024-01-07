-- migrate:up
create table app_user (
    id varchar(64) primary key,
    username varchar(64) unique,
    email varchar(64) unique,
    created_at timestamp default current_timestamp,
    role_id integer references role(id) on delete set null
)

-- migrate:down
drop table app_user
