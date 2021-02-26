const mysql = require("mysql");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const config = require("./package.json");

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
        //"View all employees by manager",
        "Add employee",
        "Add Department",
        "Add Role",
        "Remove employee",
        "Update employee role",
        //"Update employee manager",
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

        // case "View all employees by manager":
        //   byManager();
        //   start();
        //   break;

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

        // case "Update employee manager":
        //   updateEmpMan();
        //   break;

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

//? Extra, to fix later.
// byManager = () => {
//   connection.query(
//     //todo FIX THIS ONE
//     "SELECT employee.id, employee.first_name, employee.last_name, department.name, employee.manager_id AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = employee.manager_id;",
//     (err, res) => {
//       if (err) throw err;
//       console.table(res);
//     }
//   );
// };

//~ Add functions
addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "employeeFirst",
        type: "input",
        message: "What is the employee's first name?",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
      {
        name: "employeeLast",
        type: "input",
        message: "What is the employee's last name?",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
      {
        name: "department",
        type: "input",
        message: "Please enter the role id.",
      },
    ])
    .then((answers) => {
      newEmployee(
        answers.employeeFirst,
        answers.employeeLast,
        answers.department,
        answers.manager
      );
      start();
    });
};

newEmployee = (employeeFirst, employeeLast, department) => {
  connection.query(
    "INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?",
    [employeeFirst, employeeLast, department],
    function (err, res) {
      if (err) throw err;
      console.log(`Added ${employeeFirst} ${employeeLast}!`);
    }
  );
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "Department",
        type: "input",
        message: "Please enter the department you would like to add?",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
    ])
    .then((answers) => {
      newDepartment(answers.Department);
      start();
    });
};

newDepartment = (Department) => {
  connection.query(
    "INSERT INTO department SET name = ?",
    [Department],
    function (err, res) {
      if (err) throw err;
      console.log(`Added ${Department}!`);
    }
  );
};

addRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Please enter the role's title.",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
      {
        name: "salary",
        type: "input",
        message: "Please enter the role's salary.",
      },
      {
        name: "department_id",
        type: "input",
        message: "Please enter the department id.",
      },
    ])
    .then((answers) => {
      // Adds role to database
      newRole(answers.title, answers.salary, answers.department_id);
      start();
    });
};

newRole = (title, salary, department_id) => {
  connection.query(
    "INSERT INTO role SET title = ?, salary = ?, department_id = ?",
    [title, salary, department_id],
    function (err, res) {
      if (err) throw err;
      console.log(`Added ${title} ${department_id}!`);
    }
  );
};
