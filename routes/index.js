var express = require('express');
var router =express.Router();

var mysql = require('mysql');
//var router=express.Router();

var connection = mysql.createConnection({

  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mydb'
});


var stringify = require('json-stringify-safe');
// Then clean it up a little bit

connection.query('SELECT * FROM personal_detail ', function(err,res){
	  	if(err) throw err();
		var price= null;
		 res.forEach(function (result){
		 console.log(result.fname);
		 
		
		
		var title='express';
		//console.log('Result Body:', res.fname);
		 price = JSON.parse(stringify(result.fname));
		router.get('/',function(req, res, next){
	res.render('index.ejs',{title:title,
							name:price});
							 });
});
		
	});

module.exports =router;