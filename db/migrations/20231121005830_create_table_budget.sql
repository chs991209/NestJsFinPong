-- migrate:up
CREATE TABLE budgets (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    family_id BINARY(16) NOT NULL REFERENCES families (id),
    amount INT UNSIGNED NOT NULL,
    year SMALLINT UNSIGNED NOT NULL,
    month SMALLINT UNSIGNED NOT NULL,
    deducting BOOLEAN NOT NULL,
    created_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    deleted_date DATE NULL DEFAULT NULL
--     UNIQUE KEY unique_budget_entry (family_id, year, month), -- 이렇게 하면 Soft Deletion을 못함(can't soft delete by this line)
); -- Soft Deletion을 해야 할 수도 있음

-- migrate:down
DROP TABLE budgets;
