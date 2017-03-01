const inquirer = require('inquirer');
const mysql = require('mysql');


const connection = mysql.createConnection ({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'Bamazon'
});

connection.connect (function (err){

	if (err) throw err;
	console.log('connected as id ' + connection.threadID);

});

function make_purchase() {
	inquirer.prompt ([
		{
			type: 'input',
			message: 'Please enter the product ID for the item you would like to purchase.',
			name: 'product_id'
		},

		{
			type:'input',
			message: 'Please enter the quantity of items you would like purchase.',
			name: 'quantity'
		}


	]).then(handle_purchase);


function handle_purchase(purchase){
		
	var product = purchase.product_id;
	var quantity = purchase.quantity;

	// console.log(product + quantity);

	connection.query('SELECT * FROM products WHERE item_id = ?', [product], function(err, res, fields){
		if (err) throw err;
		console.log('this is res: ' + res[0].stock_quantity);
		

		if (res[0].stock_quantity == 0){

			return console.log("Sorry, but we are currently out of " + json[0].product_name + ". Please try again tomorrow!")

		}else if (json[0].stock_quantity < quantity){

			console.log("Sorry, but we do not have enough " + json[0].product_name + "s" + " in stock. Please enter a quantity less than " + json[0].stock_quantity);
			make_purchase();

		}else{

			var total = parseFloat(json[0].price * quantity);
			var quantityNew = parseInt(json[0].stock_quantity - quantity);
			console.log(quantityNew);
			console.log("Your total is: " + total);


			connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [quantityNew, product], function(err, res, fields){
				if (err) throw err;
				console.log(res);


			});


		}
		process.exit();

	});

};

module.exports = {make_purchase};
