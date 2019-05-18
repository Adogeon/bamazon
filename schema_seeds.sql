DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(42) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY(item_id)
)

INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES 
("GoBeast Power Tower","Sport & Fitness",154.99,120),
("Trayvax Element Wallet","Men Accessories",79.09,79),
("Vilano Diverse 3.0","Sport & Outdoors",299.00,307),
("COWIN SE7","Headphones",109.99,138),
("KAVU Rope Sling Bag","Sport & Outdoors",49.95,1029),
("Smith's PP1 Sharpener","Home & Kitchen", 6.47,2834),
("Herschel Novel Duffle Bag","Luggage & Travel Gear",45.19,245),
("Asmodee Jaipur","Games",18.54,23),
("Foldable Cloth Storage Cube","Home & Kitchen",22.99,421),
("Seiko Men's SNK807","Men Watches",82.18,433)

