# crew-data

<br />

## Table of Contents

đĻ

- [Description](#description)
- [User Story](#user-story)
- [Installation](#installation)
- [License](#license)
- [Demo](#demo)
- [Criteria](#criteria)
- [Collaboration](#collaboration)

<br />
<br />

## Description

đ

Crew Data is a back end CMS used to store, track, and update team data directly from your command-line.

<br />
<br />

## User Story

đĻ

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

<br />

## Installation

âŦī¸

Must first launch mySQL server with the following commands:

```
cd 'db'
mysql -u root
source schema.sql
quit
..
```

<br />

Application will then run in the command-line with:

```
node app
```

<br />

Employing the following technology:

[<img src="./assets/images/node.svg" height="20px">](https://nodejs.org/en/docs/) [<img src="./assets/images/npm.svg" height="20px">](https://www.npmjs.com/) [<img src="./assets/images/inquirer.svg" height="20px">](https://www.npmjs.com/package/inquirer) [<img src="./assets/images/mysql.svg" height="20px">](https://www.npmjs.com/package/mysql2) [<img src="./assets/images/console.table.svg" height="20px">](https://www.npmjs.com/package/console.table.svg/)

<br />
<br />

## License

đĻ

Copyright (c) David Dyer [2021]

[<img src="./assets/images/isc.svg" height="20px">](https://choosealicense.com/licenses/isc/)

<br />

## Demo

đšī¸

[![](assets/demo/demo_ss.png)](https://youtu.be/r3SNtPsUMXM)

<img src="./assets/demo/ss1.png" width = "600">
<img src="./assets/demo/ss2.png" width = "600">

<br />
<br />

## Criteria

â

```
A command-line application that accepts user input.

User is first presented with option to: view departments, view roles, view employees,
add department, add role, add employee, or update employee role.

View departments presents a formatted table displaying department names and department ids.

View roles presents a formatted table displaying job titles, role ids, parent department,
and salary.

View employees presents a formatted table displaying employee ids, first name, last name,
job title, department, salary, and reporting manager.

Add department prompts for name of department to be added to database.

Add role prompts for name, salary, and department of role to be added to database.

Add employee prompts for first / last name, role, and manager of employee to be added to
database.

Update employee role prompts to select employee and update their new role to the database.
```

<br />
<br />

## Collaboration

đ§

Development efforts most often include guidance from Jedi Master:
**Chris Champness**

<a href= "https://github.com/CChampness"><img src=
"https://avatars.githubusercontent.com/u/87551272?v=4" width="50px"/></a>

Additional collaboration with:
**Julius Markauskas**

<a href="https://github.com/Juliusm9791"><img src="https://avatars.githubusercontent.com/u/88810468?v=4" width="50px"/></a>

<br />

**Reporting issues**:
Contact [djdyer](https://www.github.com/djdyer) to report bugs.

**Contributions**:
Clone branch, submit pull request for review after completing any improvements.

<br />
<br />
<br />
Thanks for taking a look!
  
đ¤
