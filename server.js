// import and require express and mysql2
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employee_db'
  },
  console.log(`You are connected to employee_db.`)
);

function start() 
{
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
    })
    .then(answer => {
        switch (answer.action) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
}

function viewAllDepartments() {
    const query = 'SELECT id, department_name FROM department';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllRoles() {
    const query = `SELECT role.id, title, salary, department_name 
                   FROM role 
                   INNER JOIN department ON role.department_id = department.id`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllEmployees() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department_name AS 'department', role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                   FROM employee
                   LEFT JOIN role ON employee.role_id = role.id
                   LEFT JOIN department ON role.department_id = department.id
                   LEFT JOIN employee manager ON manager.id = employee.manager_id`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addDepartment() {
    inquirer.prompt({
        name: 'department_name',
        type: 'input',
        message: 'What is the name of the new department?'
    })
    .then(answer => {
        const query = 'INSERT INTO department SET ?';
        db.query(query, answer, (err, res) => {
            if (err) throw err;
            console.log('Department added successfully!');
            start();
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the new role?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the new role?',
            validate: value => !isNaN(value) ? true : 'Please enter a number'
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'What is the department id for the new role?',
            validate: value => !isNaN(value) ? true : 'Please enter a number'
        }
    ])
    .then(answer => {
        const query = 'INSERT INTO role SET ?';
        db.query(query, answer, (err, res) => {
            if (err) throw err;
            console.log('Role added successfully!');
            start();
        });
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the first name of the employee?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the last name of the employee?'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'What is the role id of the employee?',
            validate: value => !isNaN(value) ? true : 'Please enter a number'
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'What is the manager id of the employee?',
            validate: value => !isNaN(value) || value === '' ? true : 'Please enter a number or leave blank'
        }
    ])
    .then(answer => {
        const query = 'INSERT INTO employee SET ?';
        db.query(query, answer, (err, res) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            start();
        });
    });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: 'employee_id',
            type: 'input',
            message: 'Which employee (id) do you want to update?',
            validate: value => !isNaN(value) ? true : 'Please enter a number'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'What is the new role id for this employee?',
            validate: value => !isNaN(value) ? true : 'Please enter a number'
        }
    ])
    .then(answer => {
        const query = 'UPDATE employee SET ? WHERE ?';
        db.query(query, [{ role_id: answer.role_id }, { id: answer.employee_id }], (err, res) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');
            start();
        });
    });
}

// Start server after DB connection
db.connect((err) => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      start();  // Start your command line interface
    });
  });
  