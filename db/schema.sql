DROP DATABASE IF EXISTS crew_db;
CREATE DATABASE crew_db;

USE crew_db;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_id),
);

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT,
  role_name VARCHAR(30) NOT NULL,
  parent_dept VARCHAR(30) NOT NULL,
  salary INT NOT NULL DECIMAL,
  FOREIGN KEY (department_id)
  REFERENCES departments(department_id)
);

CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  second_name VARCHAR(30) NOT NULL,
  job_title VARCHAR(30) NOT NULL,
  department VARCHAR(30) NOT NULL,
  salary INT NOT NULL DECIMAL,
  reporting_manager VARCHAR(30) NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(department_id)
);




-- You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. You might also want to include a `seeds.sql` file to pre-populate your database, making the development of individual features much easier.
