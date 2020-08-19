create table films (
    id  bigserial not null,
    title varchar(255),
    genre varchar(255),
    watched boolean,
    year int4,
    primary key (id)
);

insert into films (id, title, genre, watched, year)
values (1, 'Matrix', 'Fantastic', false, 1999);