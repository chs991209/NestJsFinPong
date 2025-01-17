-- migrate:up
CREATE TABLE middle_fixed_money_flow_groups (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fixed_money_flow_id INT UNSIGNED NOT NULL REFERENCES fixed_money_flows (id),
    group_id INT UNSIGNED NOT NULL REFERENCES fixed_money_flow_groups (id),
--     family_id BINARY(16) NOT NULL REFERENCES families (id), -- May be needed some day
--     user_id BINARY(16) NOT NULL REFERENCES users (id)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
);

-- migrate:down
DROP TABLE middle_fixed_money_flow_groups;
