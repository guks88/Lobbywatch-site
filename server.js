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
    connection.query("SELECT  interessengruppe.name_fr, interessengruppe.id FROM BD_TB.interessengruppe ORDER BY interessengruppe.name_fr;", function (error, rows, fields) {
        if(error){
            console.log('Error in the query : search_all_lobbies');
        }else{
            console.log('Success query!\n');
            res.end(JSON.stringify(rows));
        }
    });
});

// Get all Branches
app.get('/search_all_branches',function(req,res){
    connection.query("SELECT  branche.name_fr, branche.id FROM BD_TB.branche ORDER BY branche.name_fr;", function (error, rows, fields) {
        if(error){
            console.log('Error in the query : search_all_branches');
        }else{
            console.log('Success query!\n');
            res.end(JSON.stringify(rows));
        }
    });
});

// Get all Lobbies with size
app.get('/search_all_lobbies_size',function(req,res){
    var selected = req.query.selected;
    var where_query = '';
    if (selected != 0) {
        where_query = 'WHERE ID = "'+selected+'"';
    }
    var query = "SELECT id, name, size, parent FROM BD_TB.viewforvegalobbies "+where_query+"ORDER BY parent;";
    connection.query(query, function (error, rows, fields) {
        if(error){
            console.log('Error in the query : search_all_lobbies_size');
        }else{
            rows.unshift({"id": 1, "name":"Lobbies"});
            console.log('Success query!\n');
            res.end(JSON.stringify(rows));
        }
    });
});

// Get All members of lobbies with their political parties
app.get('/search_all_lobbies_members_parties',function(req,res){
    var selected = req.query.selected;
    var where_query = '';
    if (selected != 0) {
        where_query = 'WHERE ID = "'+selected+'"';
    }
    var query = "SELECT * FROM BD_TB.membredechaquelobby "+where_query+";";
    connection.query(query, function (error, rows, fields) {
        if(error){
            console.log('Error in the query : search_all_lobbies_members_parties');
        }else{
            console.log('Success query!\n');
            res.end(JSON.stringify(rows));
        }
    });
});

// Get all Branches with size
app.get('/search_all_branches_size',function(req,res){
    var selected = req.query.selected;
    var where_query = '';
    if (selected != 0) {
        where_query = 'WHERE ID = "'+selected+'"';
    }
    var query = "SELECT id+1 AS id, branches AS name, 1 AS parent, nombreMembre AS size FROM BD_TB.taillesbranches "+where_query+";";
    connection.query(query, function (error, rows, fields) {
        if(error){
            console.log('Error in the query : search_all_ branches_size');
        }else{
            rows.unshift({"id": 1, "name":"Branches"});
            console.log('Success query!\n');
            res.end(JSON.stringify(rows));
        }
    });
});

// Get All members of branches with their political parties
app.get('/search_all_branches_members_parties',function(req,res){
    var selected = req.query.selected;
    var where_query = '';
    if (selected != 0) {
        where_query = 'WHERE ID = "'+selected+'"';
    }
    var query = "SELECT * FROM BD_TB.membredechaquebranche "+where_query+";";
    connection.query(query, function (error, rows, fields) {
        if(error){
            console.log('Error in the query : search_all_branches_members_parties');
        }else{
            console.log('Success query!\n');
            res.end(JSON.stringify(rows));
        }
    });
});

// Get all Votes
app.get('/search_all_votes',function(req,res){
    connection.query("SELECT concat(date) as date, affairId, affairTitle FROM voteslobbiesdatatable ORDER BY affairTitle;",
        function (error, rows, fields) {
        if(error){
            console.log('Error in the query : search_all_votes');
        }else{
            console.log('Success query!\n');
            res.end(JSON.stringify(rows));
        }
    });
});

// Get All votes by selected changed
app.get('/search_all_votes_selected_changed',function(req,res){
    var selected = req.query.selected;
    var where_query = '';
    if (selected != 0) {
        where_query = 'WHERE affairId = "'+selected+'"';
    }
    var query = "SELECT concat(date) as date, affairId, affairTitle, affairVoteId FROM voteslobbiesdatatable "+where_query+" ORDER BY affairTitle;";
    connection.query(query, function (error, rows, fields) {
        if(error){
            console.log('Error in the query : search_all_votes_selected_changed');
        }else{
            console.log('Success query!\n');
            res.end(JSON.stringify(rows));
        }
    });
});

// Get the vote selected
app.get('/search_vote_selected',  function(req,res){
    var affairVoteId = req.query.affairVoteId;
    var where_query = '';
    if (affairVoteId != 0) {
        where_query = 'WHERE affairVoteId = "'+affairVoteId+'"';
    }
    var query = "SELECT votes.affairId, votes.affairTitle, votes.meaningYes, votes.meaningNo, votes.affairVoteId FROM votes "+where_query+"  LIMIT 1;";
    connection.query(query, function (error, rows, fields) {
        if(error){
            console.log('Error in the query : search_vote_selected');
        }else{
            console.log('Success query!\n');
            res.end(JSON.stringify(rows));
        }
    });
});