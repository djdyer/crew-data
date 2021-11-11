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
VALUES ("Erica", "Collette",  1, "Joey Gonzales"),
       ("Maya", "Randolph",  2,  "Joey Gonzales"),
       ("Joey", "Gonzales", 3, "null"),
       ("Dillon", "Jones", 4, "Joey Gonzales"),
       ("Josh", "Vides", 5, "Dillon Jones"),
       ("Jasmin", "Ortega", 5, "Dillon Jones"),
       ("Alex", "Campos", 6, "Dillon Jones"),
       ("David", "Dyer", 7, "Joey Gonzales"),
       ("Eddie", "Ramirez", 8, "David Dyer"),
       ("Kaylee", "MacLeod", 8, "David Dyer"),
       ("Nilo", "Laguerta", 9, "Joey Gonzales"),
       ("Robert", "Velasquez", 10, "Ronald Ortiz"),
       ("Nick", "Miller", 10, "Ronald Ortiz"),
       ("Kathryn", "Weigel", 11, "Joey Gonzales"),
       ("Julie", "Suarez", 12, "Kathryn Weigel"),
       ("Scotty", "Litel", 13, "Joey Gonzales"),
       ("Mike", "Franklin", 14, "Scotty Litel"),
       ("Nathan", "Hayes", 14,  "Scotty Litel"),
       ("Ronald", "Ortiz", 15, "Joey Gonzales"),
       ("Bill", "Cramer", 16, "Ronald Ortiz"),
       ("Tony", "Rodriguez", 16, "Ronald Ortiz");