var express = require('express');
var app = express();
var mysql = require('mysql');
var path = require('path');
//var router=express.Router();

var connection = mysql.createConnection({

            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'website'
});



//trial
var routes = require('./routes/index.js');
app.set('./views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use('/users',routes);

routes = require('./routes/books.js');
app.set('./views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use('/u',routes);









var del = connection._protocol._delegateError;
connection._protocol._delegateError = function(err, sequence){
  if (err.fatal) {
    console.trace('fatal error: ' + err.message);
  }
  return del.call(this, err, sequence);
};

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



//connection.end();
// Binding express app to port 3000
app.listen(3030,function(){
    console.log('Node server running @ http://localhost:3000')
});



app.use('/node_modules',  express.static(__dirname + '/node_modules'));

app.use('/style',  express.static(__dirname + '/style'));

app.get('/',function(req,res){
    res.sendFile('home.html',{'root': __dirname + '/templates'});//home page
});


app.get('/showSignInPage',function(req,res){
    res.sendFile('signin.html',{'root': __dirname + '/templates'});//sign in page
});
app.get('/showSignInPageretry',function(req,res){
    res.sendFile('signinretry.html',{'root': __dirname + '/templates'});//signin retry page
});
app.get('/showSignUpPage',function(req,res){
  res.sendFile('signup.html',{'root':__dirname + '/templates'})//signup page
});

app.get('/message',function(req,res){
    res.sendFile('message.html',{'root': __dirname + '/templates'});//message of successful login
});
app.get('/donate_msg',function(req,res){
    res.sendFile('donate_msg.html',{'root': __dirname + '/templates'});//message of successful login
});


app.get('/loggedin',function(req,res){
    res.sendFile('loggedin.html',{'root': __dirname + '/templates'});//login page
});

app.get('/personal_info',function(req,res){
    res.sendFile('personal_info.html',{'root': __dirname + '/templates'});//personal info page after login
});

app.get('/update_email',function(req,res){
    res.sendFile('update_email.html',{'root': __dirname + '/templates'});//update_email  page after login
});

app.get('/add_address',function(req,res){
    res.sendFile('add_address.html',{'root': __dirname + '/templates'});//add address page after login
});
app.get('/change_password',function(req,res){
    res.sendFile('change_pass.html',{'root': __dirname + '/templates'});//add address page after login
});
app.get('/donate',function(req,res){
    res.sendFile('donate.html',{'root': __dirname + '/templates'});//donate page
});

app.get('/rent',function(req,res){
    res.sendFile('rent.html',{'root': __dirname + '/templates'});//donate page
});





app.post('/myaction', function(req, res) {//for entering personal data in db
	
	
	
	//add details to personal_detail table
	//console.log(req.body);
	var record = {u_id:"1", fname:req.body.fname, lname:req.body.lname, gender:req.body.gender, dob:req.body.dob};

	//connection.connect();
	connection.query('INSERT INTO u_register SET ?', record, function(err,res){
	  	if(err) throw err;
		
		
		console.log('Last record insert id:', res.insertId);
		
	});

	res.redirect('/message');
	//connection.end();

	res.end();
});



app.post('/donate', function(req, res) {//for entering personal data on db
	
/*
	console.log(req.body.b_name);
    console.log(req.body.category);
    console.log(req.body.lang);
    console.log(req.body.b_name);
    console.log(req.body.a_name);
	console.log(req.body.copies);
*/
    
    
	var record = {id:"1", name:req.body.b_name, author:req.body.a_name, category:req.body.category, copies:req.body.copies, lang:req.body.lang};

	//connection.connect();
	connection.query('INSERT INTO books_donate SET ?', record, function(err,res){
	  	if(err) throw err;
		
		
		console.log('Last record insert id:', res.insertId);
		
	});


	res.redirect('/add_address');
	//connection.end();

	res.end();
});





app.post('/rent', function(req, res) {//for entering personal data on db
	
/*
	console.log(req.body.b_name);
    console.log(req.body.category);
    console.log(req.body.lang);
    console.log(req.body.b_name);
    console.log(req.body.a_name);
	console.log(req.body.copies);
    console.log(req.body.a_date);
    console.log(req.body.t_date);*/


	var record = {id:"1", name:req.body.b_name, author:req.body.a_name, category:req.body.category, lang:req.body.lang, a_date:req.body.a_date, t_date:req.body.t_date, price:"100", copies:req.body.copies};

    
	//connection.connect();
	connection.query('INSERT INTO books_rent SET ?', record, function(err,res){
	  	if(err) throw err;
		
		
		console.log('Last record insert id:', res.insertId);
		
	});
    
	res.redirect('/add_address');
	//connection.end();

	res.end();
});



app.post('/action', function(req, res) {// for signing up 
	//console.log('req.body');
	//console.log(req.body);
	var record = {email: req.body.email, pass: req.body.pass};

	//connection.connect();
	connection.query('INSERT INTO u_login SET ?', record, function(err,res){
	  	if(err) throw err;
		//console.log('Last record insert id:', res.insertId);
		
	});

	res.redirect('/message');
	//connection.end();

});


app.post('/verifyuser', function(req,res){
	console.log('checking user in database');
	console.log(req.body.pass);
	var selectString = 'SELECT COUNT(email) FROM u_login WHERE email="'+req.body.email+'" AND pass="'+req.body.pass+'" ';
	 
	connection.query(selectString, function(err, results) {
		
        //console.log(results);
        var string=JSON.stringify(results);
        console.log(string);
        //this is a walkaround of checking if the email pass combination is 1 or not it will fail if wrong pass is given
        if (string === '[{"COUNT(email)":1}]') {
			res.redirect('/personal_info');
	
	        }  
        if (string === '[{"COUNT(email)":0}]')  {
        	res.redirect('/showSignInPageretry');
        	
        }
});



});
