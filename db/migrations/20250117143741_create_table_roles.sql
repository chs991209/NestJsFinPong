-- migrate:up
CREATE TABLE roles (
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL
);

SET SESSION SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

INSERT INTO roles(id, name) VALUES (0, "일반");
INSERT INTO roles(id, name) VALUES (1, "관리자");

-- migrate:down
DROP TABLE roles;
