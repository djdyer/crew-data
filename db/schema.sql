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
  dept VARCHAR(30) NOT NULL,
  dept_id INT,
  salary INT NOT NULL,
  FOREIGN KEY (dept_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_name VARCHAR(30) NOT NULL,
  dept VARCHAR(30),
  dept_id INT,
  salary INT NOT NULL,
  manager VARCHAR(30),
  FOREIGN KEY (dept_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);




-- You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. 