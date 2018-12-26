var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var port = 8080;

mongoose.connect('mongodb://localhost:27017/datinxy');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.listen(port);
console.log(`App is listening on port ${port}`)

var User = mongoose.model("User", {
	text: String,
	username: String,
	password: String,
	email: String,
	firstname: String,
	lastname: String
});

    // get all users
    app.get('/api/users', function(req, res) {

        // use mongoose to get all users in the database
        User.find(function(err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(users); // return all users in JSON format
        });
    });

    app.get('/api/users/:id', function(req, res) {

        // use mongoose to get all users in the database
        User.findById(req.params.id, function(err, user) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(user); // return all users in JSON format
        });
    });

    // create user and send back all users after creation
    app.post('/api/users', function(req, res) {

        // create a user, information comes from AJAX request from Angular
        User.create({
            text : req.body.text,
            done : false
        }, function(err, user) {
            if (err)
                res.send(err);

            // get and return all the users after you create another
            User.find(function(err, users) {
                if (err)
                    res.send(err)
                res.json(users);
            });
        });

    });

    // delete a user
    app.delete('/api/users/:user_id', function(req, res) {
        User.remove({
            _id : req.params.user_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the users after you create another
            User.find(function(err, users) {
                if (err)
                    res.send(err)
                res.json(users);
            });
        });
    });


/*var bodyParser = require("mongodb");
var express = require('express');
var mongodb = require("mongodb");
var app = express();
var logger = require("morgan")*/

/*var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/datinxy"

MongoClient.connect(url, function(err, db){
	if(err){
		console.log("Unable to connect to database")
	} else{
		console.log("Connection Established")
		var users = db.db("datinxy")
		var data = users.collection("users")
		
		data.find({}).toArray(function(err, result){
			if(err){
				console.log(err)
			}else if (result.length){
				console.log(result)
			}else{
				console.log("No results found")
			}
		})
	}
})*/