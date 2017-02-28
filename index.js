const mysql = require('mysql');
const inquirer = require('inquirer');

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


function showProducts() {
	connection.query('SELECT item_id, product_name, price FROM products', function (err, results) {
		if (err) throw err;
		console.log("Welcome to Bamazon! Please view our cataloge and type BUY to make a purchase.");
		console.log(results);
	});

	function enterApp() {
	inquirer.prompt([

		{
			type: 'list',
			message: "Welcome to Bamazon! Please view our cataloge + choose BUY to make a purchase.",
			choices: ['BUY',
						'GTFO'],
			name: 'enter'
		}


	]).then(function(user){



		switch (user.enter){
		
			case 'BUY': 
				return console.log('hello!');
				break;

			case 'GTFO':
			return console.log('see ya later');
			break;
			};

			
		});

	};
	enterApp();
};

showProducts();