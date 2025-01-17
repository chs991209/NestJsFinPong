-- migrate:up
CREATE TABLE users (
    id BINARY(16) PRIMARY KEY, -- WAS server manually generates UUID
    name VARCHAR(150) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    birth_date DATE NULL,
    phone_number VARCHAR(100) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
);

-- migrate:down
DROP TABLE users;
