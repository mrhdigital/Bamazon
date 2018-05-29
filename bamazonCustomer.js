// initialize the npm packages
var mysql = require("mysql");
var Table = require('cli-table');
//var console_table = require("console.table");


// Initialize the connection variable to sync with a MySQL database

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

var customerViewTable = new Table({
    head: ['ID', 'Product Name', 'Department','Price','Stock_Quantity']
  , colWidths: [5, 45,15,12,10]
});

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//  // connection.end();
//  afterConnection();
// });
// function afterConnection() {
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//    //console.log(res);
//     //console.table(res);
//     connection.end();
//   });
// }



// Creates the connection with the server and 
//loads the product data upon a successful connection

connection.connect(function(err) {
    if (err) throw err;
    console.log("error connecting: " + connection.threadId);
    
    loadProducts();
    connection.end();

});
// Function to load the products table from the database and 
//print results to the console
function loadProducts() {
    // Select all the data from mySQL product table
    connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;

        // Draw the talbe in the terminal using the response
        //console.table(res);
        res.forEach(function(row) {

        customerViewTable.push(
            [row.item_id, row.product_name, row.department_name, '$'+row.price, row.stock_quantity]
        );
        
    });
    console.log(customerViewTable.toString());
});
}