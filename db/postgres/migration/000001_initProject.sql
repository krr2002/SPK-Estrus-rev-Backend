-- Up Migration
CREATE TABLE IF NOT EXISTS roles(
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

INSERT INTO roles(id, name) VALUES
    ('3b1898e7-83f6-475f-a439-8b5c5ccadafd', 'USER'),
    ('08eaee34-cc4d-4aad-b95a-7e0e077efb34', 'ADMIN'),
    ('b00b1f24-4d8f-43a3-8059-27ee48ac76f0', 'EXPERT');


CREATE TABLE IF NOT EXISTS users(
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    role_id UUID CONSTRAINT fk_users_role_id REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE DEFAULT '3b1898e7-83f6-475f-a439-8b5c5ccadafd',
    username VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token_reset VARCHAR(255) NOT NULL DEFAULT gen_random_uuid() CONSTRAINT uk_users_token_reset UNIQUE,
    last_accessed TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

-- Down Migration
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;