DROP DATABASE IF EXISTS employees_DB;
CREATE database employees_DB;

USE employees_DB;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  salary DEC(10,4) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name) values 
('Bar Staff'),
('Accounting'),
('Delivery'), 
("Social Media"), 
("Production");

INSERT INTO role (title, salary, department_id) values 
('Barista', 35.000, 1), 
('Store Manager', 35.000, 1), 
('Accountant', 60.000, 2), 
('Delivery Driver', 30.000, 3), 
('Delivery Manager', 40.000, 3), 
('Social Media Manager', 30.000, 4), 
('Production Roaster', 40.000, 5), 
('Head Roaster', 60.000, 5), 
( 'Production Manager', 35.000, 5),
( 'Production Assistant', 25.000, 5);

INSERT INTO employee (first_name,last_name,role_id,manager_id) values 
("Bobby","Drake", 1, 4),
("Scott","Summers", 1, 4),
("Hank","McCoy", 3, null),
("Jean","Grey", 2, null),
("Kurt","Wagner", 4, 6),
("Piotr","Rasputin", 5, null),
("Betsy","Braddock", 6, null),
("Kitty","Pride", 7, 9, null),
("Erik","Eisenhardt", 8, null),
("Remy","LeBeau", 10, 11),
("Ororo","Munroe", 9, null),
("Wanda","Maximoff", 1, 4)



