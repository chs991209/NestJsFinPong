-- migrate:up
CREATE TABLE users (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())), -- WAS server manually generates UUID
    name VARCHAR(150) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    birthdate DATE NULL,
    phone_number VARCHAR(100) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
);

-- migrate:down
DROP TABLE users;
