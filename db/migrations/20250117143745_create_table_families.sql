-- migrate:up
CREATE TABLE families (
    id BINARY(16) PRIMARY KEY,
    created_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    deleted_date DATE NULL DEFAULT NULL
);

-- migrate:down
DROP table families;
