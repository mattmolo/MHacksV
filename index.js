var mongo = require('mongodb');
var express = require('express');
var monk = require('monk');
var db =  monk('localhost:27017/mhacksv');
var app = new express();

app.configure(function() {

    //serve any files in public folder
    app.use(express.static(__dirname + '/public'));

    //enable json parsing abilities
    app.use(express.bodyParser());
    app.use(express.json());

    //Enable cors support
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
});


//return user file at /user/username/
app.get('/user/:name', function(req,res){
    var name = req.params.name;
    var collection = db.get("users");

    collection.find({"username": name}, {limit:1}, function(e, docs){
        if (docs.length < 1) res.status(404).send('Not found');
        res.json(docs);
    });
});

//set grid and config data from post request
app.post('/user/:name/update', function(req,res){
    var name = req.params.name;
    var grid = req.body.grid;
    var config = req.body.config;
    var collection = db.get("users");

    collection.update({"username": name}, {$set: {grid: grid, config: config}}, function(e, docs){
        res.json(docs);
    });
});

//Add a new user
app.post('/user/new', function(req,res){
    var username = req.body.username
    var name = req.body.name;
    var grid = req.body.grid;
    var config = req.body.config;
    var collection = db.get("users");

    collection.insert({
        username: username,
        name: name,
        grid: grid,
        config: config
    }, function(e, docs){
        res.json(docs);
    });
});


app.listen(4050);
