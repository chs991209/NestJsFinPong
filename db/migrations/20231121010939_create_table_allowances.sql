-- migrate:up
CREATE TABLE allowances (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BINARY(16) NOT NULL REFERENCES users (id),
    family_id BINARY(16) NOT NULL REFERENCES families (id),
    amount INT UNSIGNED NOT NULL,
    year SMALLINT UNSIGNED NOT NULL,
    month TINYINT NOT NULL,
    created_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
--     UNIQUE KEY unique_allowances_entry (user_id, year, month) -- 이렇게 하면 Soft Deletion을 못함(can't soft delete by this line)
    deleted_at TIMESTAMP NULL
);

-- migrate:down
DROP TABLE allowances;
