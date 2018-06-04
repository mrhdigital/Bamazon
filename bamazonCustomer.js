// initialize the npm packages
var mysql = require("mysql");
var inquirer = require('inquirer');
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

var total = 0;

var customerViewTable = new Table({
    head: ['ID', 'Product Name', 'Department','Price','stock_quantity']
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
    //connection.end();

});
// Function to load the products table from the database and 
//print results to the console
function loadProducts(callback) {
    // Select all the data from mySQL product table
    connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;

        // Draw the talbe in the terminal using the response
        //console.table(res);
        res.forEach(function(row) {
          // customerViewTable.splice(10);
        customerViewTable.push(
            [row.item_id, row.product_name, row.department_name, '$'+row.price, row.stock_quantity]
        );
        
    });
    console.log(customerViewTable.toString());

       res.forEach(function(row) {
        customerViewTable.splice(0);
       });

    promptConsumer(res);
    
    callback;
});
}

function promptConsumer (inventory){
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Enter item ID from the table: or [Quit with Q]',
            validate: function (value) {
                //var value = parseInt(value);
                //return (value >= 1 && value <= customerViewTable.length);
                return !isNaN(value) || value.toLowerCase() === "q";
            }
        }
        // {
        //     type: 'input',
        //     name: 'quantity',
        //     message: 'Enter quantity: ',
        //     validate: function (value) {
        //         var value = parseInt(value);
        //         return value >= 1
        //     }
        // }

//     ])
//     .then(function (answers) {
//         checkIfShouldExit(answers.item_id);
//         checkAndUpdateInventory(answers.item_id, answers.quantity,promptConsumer);
//     });
// }
    ])
.then(function(value) {
    // Check if the user wants to quit the program
    checkIfShouldExit(value.item_id);
    var choiceId = parseInt(value.item_id);
    var product = checkInventory(choiceId, inventory);

    // If there is a product with the id the user chose, prompt the customer for a desired quantity
    if (product) {
      // Pass the chosen product to promptCustomerForQuantity
      promptCustomerForQuantity(product);
    }
    else {
      // Otherwise let them know the item is not in the inventory, re-run loadProducts
      console.log("\nThat item is not in the inventory.");
      loadProducts();
    
    }
  });
}
// Prompt the customer for a product quantity
function promptCustomerForQuantity(product) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "quantity",
          message: "How many would you like? [Quit with Q]",
          validate: function(val) {
            return val > 0 || val.toLowerCase() === "q";
          }
        }
      ])
      .then(function(val) {
        // Check if the user wants to quit the program
        checkIfShouldExit(val.quantity);
        var quantity = parseInt(val.quantity);
  
        // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
        if (quantity > product.stock_quantity) {
          console.log("\nInsufficient quantity!");
          console.log("Sorry, we have only: " + product.stock_quantity + " in stock.");
          promptCustomerForQuantity(product);
        }
        else {
          // Otherwise run makePurchase, give it the product information and desired quantity to purchase
          //checkAndUpdateInventory(product, quantity);
          checkAndUpdateInventory(product, quantity,promptConsumer);
        }
      });
  }

// Purchase the desired quanity of the desired item
function checkAndUpdateInventory(product, quantity, callback) {
    
    connection.query(
      "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
    [product.stock_quantity - quantity, product.item_id],
      function(err, res) {
        // Let the user know the purchase was successful, re-run loadProducts
        console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
        console.log("Total Cost is: " + (quantity*product.price).toFixed(2) + " dollars");
       //console.log(res);
        // var subtotal = currentItem[0].parseInt(price) * quantity;
        //         total = total + subtotal;
        //         if (err) throw err;

        //         console.log("subtotal: " + currentItem[0].product_name + " " + currentItem[0].price +
        //                 " x " + quantity + " = $" + subtotal);
        //         console.log("current total: $" + total);
        loadProducts();
      //})
      });
  }
  



// Check to see if the product the user chose exists in the inventory
function checkInventory(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].item_id === choiceId) {
        // If a matching product is found, return the product
        return inventory[i];
      }
    }
    // Otherwise return null
    return null;
  }
// Check to see if the user wants to quit the program
function checkIfShouldExit(item_id) {
    if (item_id.toLowerCase() === "q") {
      // Log a message and exit the current node process
      console.log("Goodbye!");
      process.exit(0);
    }
  }