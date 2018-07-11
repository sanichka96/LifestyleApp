alter table if exists DAILY_ACTIVITY drop constraint FKcjj5ej5mo0wuheg5jnjcjg37u;
alter table if exists DAILY_ACTIVITY_MEAL drop constraint FK2i34bk76g8dg281vlxa5tsa7f;
alter table if exists DAILY_ACTIVITY_MEAL drop constraint FK9wf90m76s0jyqk404cxo6iy2r;
alter table if exists DAILY_ACTIVITY_TRAINING drop constraint FK81l1ge1h40x83edrlx78dydlm;
alter table if exists DAILY_ACTIVITY_TRAINING drop constraint FKj5jwtssdi7gasfh3mxfd3trsy;

drop table if exists DAILY_ACTIVITY cascade;
drop table if exists DAILY_ACTIVITY_MEAL cascade;
drop table if exists DAILY_ACTIVITY_TRAINING cascade;
drop table if exists MEAL cascade;
drop table if exists TRAINING cascade;
drop table if exists C_USER cascade;

create sequence IF NOT EXISTS daily_activity_sequence start 1 increment 1;
create sequence IF NOT EXISTS meal_sequence start 1 increment 1;
create sequence IF NOT EXISTS training_sequence start 1 increment 1;
create sequence IF NOT EXISTS user_sequence start 1 increment 1;

create table DAILY_ACTIVITY (id int8 not null default nextval('daily_activity_sequence'), date date not null, weight float8 not null, user_id int8 not null, primary key (id));
create table DAILY_ACTIVITY_MEAL (daily_activity_id int8 not null, meal_id int8 not null, primary key (daily_activity_id, meal_id));
create table DAILY_ACTIVITY_TRAINING (daily_activity_id int8 not null, training_id int8 not null, primary key (daily_activity_id, training_id));
create table MEAL (id int8 not null default nextval('meal_sequence'), name varchar(50) not null, primary key (id));
create table TRAINING (id int8 not null default nextval('training_sequence'), name varchar(50) not null, primary key (id));
create table C_USER (id int8 not null default nextval('user_sequence'), basic_weight float8 not null, email varchar(50) not null, email_sent boolean, name varchar(50) not null, primary key (id));

alter table MEAL add constraint UK8jgdv2tt1st1ybn1mn2oql3nf unique (name);
alter table TRAINING add constraint UKt3wol6klh2wdts7eabuhdj7e1 unique (name);
alter table C_USER add constraint UKoso07pudw19e66bs4yp8hwpux unique (email);

alter table DAILY_ACTIVITY add constraint FKcjj5ej5mo0wuheg5jnjcjg37u foreign key (user_id) references C_USER;
alter table DAILY_ACTIVITY_MEAL add constraint FK2i34bk76g8dg281vlxa5tsa7f foreign key (meal_id) references MEAL;
alter table DAILY_ACTIVITY_MEAL add constraint FK9wf90m76s0jyqk404cxo6iy2r foreign key (daily_activity_id) references DAILY_ACTIVITY;
alter table DAILY_ACTIVITY_TRAINING add constraint FK81l1ge1h40x83edrlx78dydlm foreign key (training_id) references TRAINING;
alter table DAILY_ACTIVITY_TRAINING add constraint FKj5jwtssdi7gasfh3mxfd3trsy foreign key (daily_activity_id) references DAILY_ACTIVITY;

ALTER SEQUENCE daily_activity_sequence OWNED BY daily_activity.id;
ALTER SEQUENCE meal_sequence OWNED BY meal.id;
ALTER SEQUENCE training_sequence OWNED BY training.id;
ALTER SEQUENCE user_sequence OWNED BY c_user.id;
