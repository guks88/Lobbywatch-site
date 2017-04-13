var express = require('express');
var path = require('path');
const graphql = require('graphql');

var router = express.Router();

module.exports = router;

 router.get('/', function(req, res){
     res.sendFile(path.join(__dirname, '../pages/home.html'))
 });


