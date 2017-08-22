var express = require('express');
var router =express.Router();
var async = require('async');
var mysql = require('mysql');
//var router=express.Router();
var data;
var connection = mysql.createConnection({

  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'website'
});

var stringify = require('json-stringify-safe');
// Then clean it up a little bit
async.parallel([
    function(callback) {
        var queryData = "SELECT * FROM books_get";
        connection.query(queryData, function (err, rows1) {
            if (err) {
                return callback(err);
            }
            return callback(null, rows1);
        });
    },
    function(callback) {
        connection.query("SELECT * FROM books_rent", function (err, rows2) {
            if (err) {
                return callback(err);
            }
            return callback(null, rows2);
        });
    },
     function(callback) {
        connection.query("SELECT * FROM books_donate", function (err, rows3) {
            if (err) {
                return callback(err);
            }
            return callback(null, rows3);
        });
    }
], function(error, callbackResults) {
    if (error) {
        //handle error
        console.log(error);
        
    } else {
        console.log(callbackResults[0]); // rows1
        console.log(callbackResults[1]); // rows2
         console.log(callbackResults[2]); // rows2
        var data=null;
        var data1=null;
        var data2=null;
        data=callbackResults[0];
        data1=callbackResults[1];
        data2=callbackResults[2];

       
        // use this data to send back to client etc.
        router.get('/',function(req, res, next){
          
        	res.render('index.ejs',{data:data,
                                    data1:data1,
                                    data2:data2,
                                    });
        });
							 }
});


/*connection.query('SELECT * FROM books', function(err,res){
	  	if(err) throw err;
		
		var price=res;
        console.log(price);
		var title='express';
		console.log('Result Body:', res[0].name);
		router.get('/',function(req, res, next){
	res.render('index.ejs',{title:title,
							name:price});
});
		
	});
   */
module.exports =router;