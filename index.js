//DEPENDENCIES
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const db = require('./db/connection');

//MAIN MENU
function menu() {
  inquirer
      .prompt({
          name: "selection",
          type: "list",
          message: "What would you like to do?",
          choices: [
              "View All Employees",
              "View All Departments",
              "View All Roles",
              "Add Employee",
              "Add Department",
              "Add Role",
              "Update Employee Role",
              "Exit Application"
          ]
      })
      //Choices
      .then(function (answer) {
          switch (answer.selection) {
              case "View All Employees":
                  viewEmployees();
                  break;
              case "View All Departments":
                  viewDepartments();
                  break;
              case "View All Roles":
                  viewRoles();
                  break;
              case "Add Employee":
                  addEmployee();
                  break;
              case "Add Department":
                  addDepartment();
                  break;
              case "Add Role":
                  addRole();
                  break;
              case "Update Employee Role":
                  updateEmployeeRole();
                  break;
              case "Exit Application":
                  db.end();
                  break;
          }
      });
}

// WHEN I choose to view all employees
function viewEmployees() {
  var query = "SELECT * FROM employee"
  db.query(query, function (err, res) {
    console.table(res);
    menu();
  });
}
// WHEN I choose to view all departments
function viewDepartments() {
  var query = "SELECT * FROM department"
  db.query(query, function (err, res) {
    console.table(res);
    menu();
  });
}
// WHEN I choose to view all roles
function viewRoles() {
  var query = "SELECT * FROM roles"
  db.query(query, function (err, res) {
    console.table(res);
    menu();
  });
}

//WHEN I choose to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's first name",
        name: "firstName"
      },
      {
        type: "input",
        message: "Enter the employee's last name",
        name: "lastName"
      },
      {
        type: "input",
        message: "Enter the employee's role ID",
        name: "addEmployRole"
      },
      {
        type: "input",
        message: "Enter the employee's manager ID",
        name: "addEmployMan"
      }
    ])
    .then(function (data) {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      const params = [data.first_name, data.last_name, data.role_id, data.manager_id];
      db.query(query, params, function (err, rows) {
        if (err) {
          throw err;
        }
        console.table(rows);
        menu();
      });
    });
}

// WHEN I choose to add a department
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter the name of the new department",
      name: "newDept"
    })
    .then(function (res) {
      const newDepartment = res.newDept;
      const query = `INSERT INTO department (name) VALUES ("${newDepartment}")`;
      db.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        menu();
      });
    });
}

//WHEN I choose to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's title",
        name: "roleTitle"
      },
      {
        type: "input",
        message: "Enter the employee's salary",
        name: "roleSalary"
      },
      {
        type: "input",
        message: "Enter the employee's department ID",
        name: "roleDept"
      }
    ])
    .then(function (res) {
      const title = res.roleTitle;
      const salary = res.roleSalary;
      const departmentID = res.roleDept;
      const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
      db.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        menu();
      });
    });
}

//WHEN I choose to update an employee role
function updateEmployeeRole() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's ID you want to be updated",
        name: "updateEmploy"
      },
      {
        type: "input",
        message: "Enter the new role ID for that employee",
        name: "newRole"
      }
    ])
    .then(function (res) {
        const updateEmploy = res.updateEmploy;
        const newRole = res.newRole;
        const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`;
        db.query(queryUpdate, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          menu();
        })
      });
    }

menu();