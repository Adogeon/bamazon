// DECLARATION
//declare dependencies
var mysql = require('mysql');
var inquirer  = require("inquirer");
var cTable = require("console.table");     //Package for overiding console.table

//declare mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazondb"
})

// MAIN SECTION
//Initiate connect to database
connection.connect(function(err) {
    if (err) return console.log("Error when connecting to databse "+err.stack);
    //run querry for all products
    connection.query(
        "SELECT * FROM products",
        function(err,result) {
            if(err) return console.log("Error when disply all products:"+err);
            //display the product data
            var tableData = [];
            var quantityData = [];
            result.forEach(function(ele) {
                var tableRow = {
                    "Item ID":ele.item_id,
                    Product:ele.product_name,
                    Price:ele.price
                }
                tableData.push(tableRow)
                var quantityRow = {
                    id:ele.item_id,
                    quantity:ele.stock_quantity,
                    price:ele.price
                }
                quantityData.push(quantityRow);
            })
            console.table(tableData);
            //inquirer prompt to get the item choice and quantity
            inquirer.prompt([
                {   
                    type:"number",
                    message:"Please input the item ID you want to purchase: ",
                    name:"itemChoice"
                }, 
                {   
                    type:"number",
                    message:"How many ?",
                    name:"quantity"
                }
            ]).then((answer)=>{
                quantityData.forEach((ele)=>{
                    if(ele.id === answer.itemChoice) {
                        if(ele.quantity >= parseInt(answer.quantity)) {
                            var newQuantity = ele.quantity - answer.quantity;
                            connection.query(
                                "UPDATE products SET stock_quantity=? WHERE item_id=?",
                                [newQuantity,answer.itemChoice], 
                                function(err) {
                                    if(err) return console.log(err);
                                    console.log("Thank you for your business, you bill is",(answer.quantity*ele.price).toFixed(2));
                                })
                        } else {
                            console.log("Insufficient quantity");
                        }
                        break;
                    }
                })
            connection.end();
        })
    })
})



