-- migrate:up
CREATE TABLE fixed_money_flows (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BINARY(16) NOT NULL REFERENCES users (id),
    family_id BINARY(16) NOT NULL REFERENCES families (id),
    flow_type_id TINYINT UNSIGNED NOT NULL REFERENCES flow_types (id),
    category_id TINYINT UNSIGNED NOT NULL REFERENCES categories (id),
    memo VARCHAR(70) NULL,
    amount INT UNSIGNED NOT NULL,
--     year SMALLINT UNSIGNED NOT NULL,
--     month TINYINT UNSIGNED NOT NULL,
--     date TINYINT UNSIGNED NOT NULL,
    flow_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- migrate:down
DROP TABLE fixed_money_flows;
