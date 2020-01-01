DROP DATABASE IF EXISTS groceries_db;
CREATE database groceries_db;

USE groceries_db;

CREATE TABLE groceries (
  id INT NOT NULL AUTO_INCREMENT,
  unit_name VARCHAR(80) NULL,
  quantity INT NULL,
  unit_price DECIMAL (65,2) NULL,
  unit_profit DECIMAL (65,2) NULL,
  unit_revenue DECIMAL (65,2) NULL,
  unit_image VARCHAR(120) NULL,
  PRIMARY KEY (id)
);

SELECT * FROM groceries;
