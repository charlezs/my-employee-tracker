DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS managers;

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(50) NOT NULL,
)