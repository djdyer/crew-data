DROP DATABASE IF EXISTS crew_db;
CREATE DATABASE crew_db;

USE crew_db;

CREATE TABLE departments (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  dept_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  role_name VARCHAR(30) UNIQUE NOT NULL,
  dept_id INT NOT NULL,
  salary INT NOT NULL,
  CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager VARCHAR(30),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);




-- You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. 