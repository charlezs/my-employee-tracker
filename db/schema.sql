DROP DATABASE IF EXISTS employee;

CREATE DATABASE employee;

USE employee;

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(12,2) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
)