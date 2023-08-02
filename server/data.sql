CREATE DATABASE todoapp;

CREATE TABLE todos (
    id INT PRIMARY KEY,
    name VARCHAR(40),
    showTodoCalendarState BOOL,
    date VARCHAR(300),
    user_email VARCHAR(255)
);

CREATE TABLE users (
    email VARCHAR(255),
    hashed_password VARCHAR(255)
);