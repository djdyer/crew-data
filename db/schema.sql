


-- As the image illustrates, your schema should contain the following three tables:

-- - `department`

--   - `id`: `INT PRIMARY KEY`

--   - `name`: `VARCHAR(30)` to hold department name

-- - `role`

--   - `id`: `INT PRIMARY KEY`

--   - `title`: `VARCHAR(30)` to hold role title

--   - `salary`: `DECIMAL` to hold role salary

--   - `department_id`: `INT` to hold reference to department role belongs to

-- - `employee`

--   - `id`: `INT PRIMARY KEY`

--   - `first_name`: `VARCHAR(30)` to hold employee first name

--   - `last_name`: `VARCHAR(30)` to hold employee last name

--   - `role_id`: `INT` to hold reference to employee role

--   - `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)


-- You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. You might also want to include a `seeds.sql` file to pre-populate your database, making the development of individual features much easier.
