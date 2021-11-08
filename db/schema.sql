DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;

USE departments_db;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL,
);



DROP DATABASE IF EXISTS roles_db;
CREATE DATABASE roles_db;

USE roles_db;

CREATE TABLE roles (
  role_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  parent_dept VARCHAR(30) NOT NULL,
  salary INT NOT NULL DECIMAL,
);


DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  second_name VARCHAR(30) NOT NULL,
  job_title VARCHAR(30) NOT NULL,
  deptartment VARCHAR(30) NOT NULL,
  salary INT NOT NULL DECIMAL,
  reporting_manager VARCHAR(30) NOT NULL,
);




-- You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. You might also want to include a `seeds.sql` file to pre-populate your database, making the development of individual features much easier.
