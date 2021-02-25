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

        case "Viewallemployeesbymanager1":
          byManager();
          start();
          break;

        case "Add employee":
          addEmployee();
          ();
          break;

        case "Add Department":
          addDepartment();
          ();
          break;

        case "Add Role":
          addRole();
          ();
          break;

        case "Remove employee":
          removeEmployee();
          ();
          break;

        case "Update employee role":
          updateEmpRole();
          ();
          break;

        case "Update employee manager":
          updateEmpMan();
          ();
          break;

        default:
          connection.end();
      }
    });
};

byEmployees = () =>{



}