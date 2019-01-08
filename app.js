var express  = require('express');
var cors = require('cors');
var app      = express();                               // create our app w/ express                // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var port = 1234;
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("bob_bacteria.db");
var postdb = new sqlite3.Database("posts.db")
var url = require("url");

var found;

app.use(express.static(__dirname + '/src'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.listen(port);
console.log(`App is listening on port ${port}`)

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// get all users
app.get('/api/items', function(req, res) {
    o = new Object()
    var items = 'items';
    o[items] = []

    let sql = `SELECT * FROM bob
           ORDER BY name`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        if(row.name != ""){
            o[items].push(row)
        }
      });
      res.json(o[items])
      // res.json(o)
    });
});


app.get('/api/posts', function(req, res) {

    // use mongoose to get all users in the database
    Post.find(function(err, posts) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(posts); // return all users in JSON format
    });
});

app.post('/api/message/', function(req, res) {
    let postdata = [req.body.id, req.body.name, req.body.image, req.body.message, req.body.date]
    let sql = `INSERT INTO main(id, name, image, message, date) VALUES ("${postdata[0]}", "${postdata[1]}", "${postdata[2]}", "${postdata[3]}", "${postdata[4]}")`;
    postdb.run(sql, function(err){
        if(err){
            return console.error(err.message)
        }
    })
});

app.post('/api/search/', function(req, res) {
    k = new Object()
    var items = 'items';
    k[items] = []

    message = req.body.message.toLowerCase();
    let sql = `SELECT * FROM bob
           ORDER BY name`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        let name = row.name.toLowerCase();
        if(name.includes(message)){
            k[items].push(row)
        }
      });
      if(k[items]){
        found = k[items]
      }else{
        found = false;
      }
    });
});

app.get('/api/search/', function(req, res){
    if(isEmpty(found)){
        found = false
    }else{
        res.json(found)
        found = false
    }
})

app.get('/api/message/:id', function(req, res) {
    o = new Object()
    var items = 'items';
    o[items] = []

    let sql = `SELECT * FROM main
           ORDER BY name`;
    postdb.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err);
      }
      rows.forEach((row) => {
        if(row.id == req.params.id){
            o[items].push(row)
        }
      });
      res.json(o[items])
      // res.json(o)
    });
});

app.get('/api/posts/:id', function(req, res) {

    // use mongoose to get all users in the database
    Post.findById(req.params.id, function(err, post) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(post); // return all users in JSON format
    });
});

app.get('/api/items/:id', function(req, res) {
    o = new Object()
    var items = 'items';
    o[items] = []
    // use mongoose to get all users in the database
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    let sql = `SELECT * FROM bob
           ORDER BY name`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        if(row.id == req.params.id){
            o[items].push(row)
        }
      });
      res.json(o[items])
      // res.json(o)
    });
});

// create user and send back all users after creation
app.post('/api/users', function(req, res) {

    // create a user, information comes from AJAX request from Angular
    // Text means story/description
    User.create({
        text: req.body.text,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
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