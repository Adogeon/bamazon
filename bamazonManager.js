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
    //start the prompt
    inquirer.prompt({
        type:"list",
        name:"operation",
        message:"Choose your action:",
        choices:[
            {
                name:"View Product for Sale",
                value:"viewAll"
            },
            {
                name:"View Low Invetory",
                value:"viewLow"
            },
            {
                name:"Add to Inventory",
                value:"addInventory"
            },
            {
                name:"Add New Product",
                value:"addProduct"
            }
        ]
    }).then((answer)=> {
        switch(answer.operation) {
            case "viewAll":
            viewAll();
            break;
            case "viewLow":
            viewLow();
            break;
            case "addInventory":
            addMore();
            break;
            case "addProduct":
            addNewProduct();
            break;
        }
    })
})

/// FUNCTION 
function viewAll() {
    connection.query("SELECT * FROM products", function (err,result) {
        if (err) return console.log(err);
        var tableData =[];
        result.forEach(function(ele) {
            var tableRow = {
                "Item ID":ele.item_id,
                Product:ele.product_name,
                Price:ele.price,
                Stock:ele.stock_quantity
            };
            tableData.push(tableRow);
        })    
        console.table(tableData);
    })
    connection.end();
}

function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err,result) {
        if (err) return console.log(err);
        var tableData =[];
        result.forEach(function(ele) {
            var tableRow = {
                "Item ID":ele.item_id,
                Product:ele.product_name,
                Price:ele.price,
                Stock:ele.stock_quantity
            };
            tableData.push(tableRow);
        })    
        console.table(tableData);
    })
    connection.end();
}

function addMore() {
    inquirer.prompt([
        {
            type:"number",
            name:"idChoice",
            message:"Select item ID you want to increase: "
        },
        {
            type:"number",
            name:"quantity",
            message:"Input how many inventory added: "
        }
    ]).then((answer)=>{
        connection.query("SELECT item_id,product_name,stock_quantity FROM products",(err,result)=>{
            if (err) console.log(err);
            result.forEach(function(ele){
                if(ele.item_id === answer.idChoice) {
                    var newQuantity = ele.stock_quantity + answer.quantity;
                    connection.query(
                        "UPDATE products SET stock_quantity=? WHERE item_id=?",[newQuantity,answer.idChoice],
                        function(err){
                            if(err) return console.log(err);
                            console.log(`Product ${ele.product_name} has been updated to ${newQuantity}`);
                        })
                    connection.end();
                    return;
                }
            })
        })
    })
}

function addNewProduct() {
    inquirer.prompt([
        {
            type:"input",
            name:"product-name",
            message:"Input new product name:"
        },
        {
            type:"input",
            name:"dept-name",
            message:"Input the product department:"
        },
        {
            type:"number",
            name:"price",
            message:"Input the product price:"
        },
        {
            type:"number",
            name:"stock",
            message:"Input the product stock quantity:"
        }
    ]).then((answer)=>{
        connection.query(
            "INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES (?,?,?,?)",
            [answer["product-name"],answer["dept-name"],answer.price,answer.stock],
            (err)=>{
                if(err) return(console.log(err));
                console.log("The item has sucessully added");
            })
            connection.end();
            return;
    })
}
