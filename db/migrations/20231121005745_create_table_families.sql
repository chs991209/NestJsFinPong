-- migrate:up
CREATE TABLE families (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    created_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    deleted_date DATE NULL
);

-- migrate:down
DROP table families;
