-- migrate:up
CREATE TABLE money_flows (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_id TINYINT UNSIGNED NOT NULL REFERENCES categories (id),
    flow_type_id TINYINT UNSIGNED NOT NULL REFERENCES flow_types (id),
    memo VARCHAR(70) NULL,
    amount INT UNSIGNED NOT NULL,
    user_id BINARY(16) NOT NULL REFERENCES users (id),
--     year SMALLINT UNSIGNED NOT NULL,
--     month TINYINT UNSIGNED NOT NULL,
--     date TINYINT UNSIGNED NOT NULL,
    flow_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
);

-- migrate:down
DROP TABLE money_flows;
