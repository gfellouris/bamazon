-- DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

use bamazon;
CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100),
	department_name VARCHAR(100),
	price float (10, 2),
	stock_quantity INTEGER(10),
	PRIMARY KEY(item_id)
);
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
-
-- Create new example rows
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Watch", "Jewlery",200.00,10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Ring", "Jewlery",500.00,5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Earrings", "Jewlery",50.00,8);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Necklace", "Jewlery",80.00,12);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("iPhone Case", "Technology",20.00,5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Headphone", "Technology",70.00,10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Micro USB cable", "Technology",10.00,100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothing",100.00,10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Shirts", "Clothing",30.00,20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing",5.00,50);

use bamazon
select * from products
where item_id = 3;

