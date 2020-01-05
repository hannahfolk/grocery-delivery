DROP DATABASE IF EXISTS groceries_db;

-- Create the database and specified it for use.
CREATE DATABASE groceries_db;

USE groceries_db;

-- Create the table plans.
CREATE TABLE groceries (
  id int NOT NULL AUTO_INCREMENT,
  movie varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE cart (
    id INT NOT NULL AUTO_INCREMENT,
    unit_name VARCHAR(300) NOT NULL,
    unit_price DEC (5, 2) NOT NULL,
    unit_image VARCHAR (200) NULL,
    PRIMARY KEY (id)
    );

