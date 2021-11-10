DROP DATABASE IF EXISTS crew_db;
CREATE DATABASE crew_db;

USE crew_db;

CREATE TABLE departments (
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (dept_id)
);

CREATE TABLE roles (
  -- AUTO_INCREMENT wont work!!??
  role_id INT NOT NULL,
  role_name VARCHAR(30) NOT NULL,
  dept VARCHAR(30) NOT NULL,
  salary INT NOT NULL
  -- FOREIGN KEY (dept)
  -- REFERENCES departments(dept_id)
  -- ON DELETE SET NULL
);

CREATE TABLE employees (
  employee_id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_name VARCHAR(30) NOT NULL,
  dept VARCHAR(30),
  salary INT NOT NULL,
  manager VARCHAR(30)
  -- FOREIGN KEY (dept_id)
  -- REFERENCES departments(dept_id)
  -- ON DELETE SET NULL
);




-- You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. 