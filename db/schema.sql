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


INSERT INTO departments (dept_name)
VALUES ("Reception"),
       ("Human Resources"),
       ("Management"),
       ("Design"),
       ("Production"),
       ("Marketing"),
       ("Sales"),
       ("Warehouse");
       
INSERT INTO roles (role_name, dept_id, salary)
VALUES ("Receptionist", 1, 44500),
       ("HR Manager", 2, 62000),
       ("General Manager", 3, 82500),
       ("Assistant Manager", 3, 66500),
       ("Associate", 3, 52400),
       ("Intern", 3, 32500),
       ("Art Director", 4, 71800),
       ("Designer", 4, 60500),
       ("Production Coordinator", 5, 64500),
       ("Production Assistant", 5, 42000),
       ("Marketing Director", 6, 62500),
       ("Social Media Coordinator", 6, 47000),
       ("Head of Sales", 7, 75000),
       ("Sales Manager", 7, 59000),
       ("Warehouse Manager", 8, 57500),
       ("Warehouse Clerk", 8, 37500);

INSERT INTO employees (first_name, last_name, role_id, manager)
VALUES ("Erica", "Collette",  1, 3),
       ("Maya", "Randolph",  2,  3),
       ("Joey", "Gonzales", 3, null),
       ("Dillon", "Jones", 4, 3),
       ("Josh", "Vides", 5, 4),
       ("Jasmin", "Ortega", 5, 4),
       ("Alex", "Campos", 6, 4),
       ("David", "Dyer", 7, 3),
       ("Eddie", "Ramirez", 8, 8),
       ("Kaylee", "MacLeod", 8, 8),
       ("Nilo", "Laguerta", 9, 3),
       ("Robert", "Velasquez", 10, 11),
       ("Nick", "Miller", 10, 11),
       ("Kathryn", "Weigel", 11, 3),
       ("Julie", "Suarez", 12, 14),
       ("Scotty", "Litel", 13, 3),
       ("Mike", "Franklin", 14, 16),
       ("Nathan", "Hayes", 14,  16),
       ("Ronald", "Ortiz", 15, 3),
       ("Bill", "Cramer", 16, 19),
       ("Tony", "Rodriguez", 16, 19);

