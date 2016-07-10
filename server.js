'use strict';

var express = require("express"),
    mongo = require("mongodb").MongoClient,
    routes = require(process.cwd()+'/app/routes/index.js');

var app = express();
var port = process.env.PORT || 8080;

mongo.connect('mongodb://koushik:koushik1!@ds017175.mlab.com:17175/tinyurl',function(err,db){
  if(err){
    throw err;
  }
  console.log('connected to mongodb');
  app.use('/public',express.static(process.cwd()+'/public'));
  routes(app,db);
  app.listen(port,function(){
    console.log('listening to ' + port);
  });
});

