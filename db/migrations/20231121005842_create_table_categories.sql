-- migrate:up
CREATE TABLE categories (
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- migrate:down
DROP TABLE categories;
