-- migrate:up
CREATE TABLE flow_types (
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    deducting BOOLEAN NOT NULL
);

-- migrate:down
DROP TABLE flow_types;
