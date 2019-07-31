var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "R$tgers300my",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //   console.log("connected as id " + connection.threadId);
  queryAllProducts();
});
// ============================================================
function getProductInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item_id",
        message: "What is the ID of the product you would like to purchase?"
      },
      {
        type: "input",
        name: "quantity",
        message: "How many units of the product they would like to buy?"
      }
    ])
    .then(function(response) {
      checkQuantity(response.item_id, response.quantity);
    });
}
// =====================================================================
function checkQuantity(id, qty) {
  var sqlCheckStock = "SELECT * FROM products WHERE item_id=" + id;

  connection.query(sqlCheckStock, function(err, res) {
    if (err) throw err;
    if (res.length === 0) {
      console.log("Sorry, your item was not found in our inventory.");
      continueShopping();
    } else {
      if (qty <= res[0].stock_quantity) {
        var purchasePrice = res[0].price * qty;
        msg = "You ordered " + qty + " " + res[0].product_name;
        msg += " at a price of $" + res[0].price;
        msg += " and your total is: $" + purchasePrice;

        console.log("========================================================");
        console.log("We have your product in stock!");
        console.log("Your order is being processed..");

        var sqlUpdateQuantity =
          "UPDATE products SET stock_quantity = " +
          (res[0].stock_quantity - qty);
        sqlUpdateQuantity += " WHERE item_id=" + id;
        connection.query(sqlUpdateQuantity, function(err, data) {
          if (err) throw err;
        });
        console.log("...your order has been processed.");
        console.log(msg);
        console.log("========================================================");

        continueShopping();
      } else {
        console.log(
          "Sorry, we do not have enough inventory to fulfill your order!  Please adjust your order."
        );
        continueShopping();
      }
    }
  });
}
// =====================================================================
function queryAllProducts() {
  sqlAllProducts =
    "SELECT item_id As ITEM, product_name as Product, department_name as Department, price as Price, stock_quantity from products";
  connection.query(sqlAllProducts, function(err, res) {
    if (err) throw err;
    console.table(res);
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
    // }
    // console.log("-----------------------------------");

    getProductInfo();
  });
}
// =====================================================================
function continueShopping() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "continue",
        message: "Would you like to continue shopping?"
      }
    ])
    .then(function(res) {
      if (res.continue) {
        queryAllProducts();
      } else {
        console.log("Thanks.  Hope to see you again!");
        connection.end();
      }
    });
}
