-- migrate:up
CREATE TABLE users_families (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BINARY(16) NOT NULL REFERENCES users(id),
    family_id BINARY(16) NOT NULL REFERENCES families(id),
    role_id TINYINT UNSIGNED NOT NULL REFERENCES roles(id),
    created_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    deleted_date DATE NULL
);

-- migrate:down
DROP TABLE users_families;
