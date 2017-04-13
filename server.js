const express = require('express');
const mysql = require('mysql');
const router = require('./app/routes.js');
const app = express();
const port = 8080;

// route the app
app.use(express.static(__dirname + '/'));
app.use('/', router);

// start the server
app.listen(port, function () {
    console.log('app started')
    console.log('visible on localhost:8080')
});

// connection to DB
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'BD_TB'
});

connection.connect(function(error){
    if(error){
        console.log('Error to connect the DB');
    }else{
        console.log('Connected to the DB');
    }
});

// API's

// Get all Lobbies
app.get('/search_all_lobbies',function(req,res){
    connection.query("SELECT  interessengruppe.name_fr, interessengruppe.id FROM BD_TB.interessengruppe;", function (error, rows, fields) {
        if(error){
            console.log('Error in the query');
        }else{
            console.log('Success query!\n');
            res.end(JSON.stringify(rows));
        }
    });
});

// Get all Branches
app.get('/search_all_branches',function(req,res){
    connection.query("SELECT  branche.name_fr, branche.id FROM BD_TB.branche;", function (error, rows, fields) {
        if(error){
            console.log('Error in the query');
        }else{
            console.log('Success query!\n');
            res.end(JSON.stringify(rows));
        }
    });
});