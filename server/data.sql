CREATE DATABASE todoapp;

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255),
    hashed_password VARCHAR(255)
);

CREATE TABLE spaces (
    spaces_id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255),
    FOREIGN KEY (email) REFERENCES users(email),

    space_title VARCHAR(50)
    space_image TEXT
    space_type VARCHAR(36)
    space_content JSONB
)

CREATE TABLE blocks (
    block_id VARCHAR(36) PRIMARY KEY,
    spaces_id VARCHAR(255),
    FOREIGN KEY (spaces_id) REFERENCES spaces(spaces_id),

    block_type VARCHAR(50),
    content JSONB
);