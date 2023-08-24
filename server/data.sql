CREATE DATABASE todoapp;

CREATE TABLE todos (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(40),
    date VARCHAR(300),
    user_email VARCHAR(255)
);

CREATE TABLE users (
    email VARCHAR(255),
    hashed_password VARCHAR(255)
);