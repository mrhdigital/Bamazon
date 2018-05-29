DROP DATABASE IF EXISTS   bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price DECIMAL (100,2) NOT NULL,
    stock_quantity INT (100) NOT NULL,
    primary key (item_id)
);

    SELECT *
    FROM products;

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("The Classic Treasury of Aesop's Fables", "Books", 9.95, 150),
        ("Diary of a Wimpy Kid, Book 1", "Books", 10.55, 50),
        ("OPPO F5 youth (GOLD)", "Cell phones", 490, 100),
        ("Samesung Galaxy S9 Bundle", "Cell phones", 1129.97, 200),
        ("Apple iPhone 8 Plus", "Cell phones", 1137.99, 90),
        ("Levi's Men's 505 Regular Fit", "Apparel", 24.99, 300),
        ("Wrangler Authentics Men's Classic Straight Fit", "Apparel", 24.31, 75),
        ("Tumeric Curcumin with Bioperine 1500mg", "Health", 18.89, 225),
        ("Dr. Tobias Omega 3 Fish Oil", "Health", 29.98, 175),
        ("Panasonic RP-HJE120-PPK In_Ear Stereo EarPhone", "Electronics", 9.17, 255),
        ("Beats Solo3 Wireless On-Ear Headphones", "Electronics", 229.95, 200);