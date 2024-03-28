CREATE DATABASE todoapp;

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    hashed_password VARCHAR(255)
);

CREATE TABLE tasksModules (
    id VARCHAR(36) PRIMARY KEY,
    user_email VARCHAR(255),
    FOREIGN KEY(user_email) REFERENCES users(email),

    title VARCHAR(50),
    todos_count_limit INT,
    color VARCHAR(22),

    todos JSON
);

