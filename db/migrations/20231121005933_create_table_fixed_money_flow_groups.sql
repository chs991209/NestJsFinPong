-- migrate:up
CREATE TABLE fixed_money_flow_groups (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP NULL
);

-- migrate:down
DROP TABLE fixed_money_flow_groups;
