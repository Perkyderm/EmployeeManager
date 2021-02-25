const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const config = require("./package.json");
const cTable = require("console.table");

// creates console visual
console.log(logo(config).render());

const connection = mysql.createConnection({
  host: "localhost",
  post: 3306,
  user: "root",

  //! change this before pushing
  password: "loX0D0nT@",
  database: "employees_DB",
});

connection.connect((err) => {
  if (err) throw err;
  start();
});

start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Welcome to the shop! What would you like to do?",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Add Department",
        "Add Role",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "Exit",
      ],
    })
    .then((input) => {
      switch (input.action) {
        case "View all employees":
          byEmployees();
          start();
          break;

        case "View all employees by department":
          byDepartment();
          start();
          break;

        case "View all employees by manager":
          byManager();
          start();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Remove employee":
          removeEmployee();
          break;

        case "Update employee role":
          updateEmpRole();
          break;

        case "Update employee manager":
          updateEmpMan();
          break;

        default:
          connection.end();
      }
    });
};

//~ Display Employees, role, department
byEmployees = () => {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
};

byDepartment = () => {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
};

byManager = () => {
  connection.query(
    //todo FIX THIS ONE
    "SELECT employee.id, employee.first_name, employee.last_name, department.name, employee.manager_id AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.manager_id",
    (err, res) => {
      if (err) throw error;
      console.table(res);
    }
  );
};
