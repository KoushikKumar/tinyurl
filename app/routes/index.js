'use strict';

var ClickHandler = require(process.cwd()+'/app/controller/clickHandler.server.js');

module.exports = function(app,db){
    var clickHandler = new ClickHandler(db);
    app.route('/')
        .get(function(req,res){
            res.sendFile(process.cwd()+"/public/index.html")
    });
     
    app.route('/*')
        .get(function(req,res){
            var longurl = req.originalUrl.slice(1);
            if(!isNaN(Number(longurl))){
                clickHandler.redirectUrl(req,res);
            } else if((!(longurl.startsWith("http://www.")) || !(longurl.startsWith("https://www."))) && !(longurl.includes('.',12))){
                var result = {};
                result.error = "invalid URL";
                res.json(result);
            } else {
                clickHandler.insertUrl(req,res);
            }
            
        });
    app.route('/*')    
        .post(function(req,res){
            var longurl = req.originalUrl.slice(1);
            if(!isNaN(Number(longurl))){
                res.json({'result':'validationError'})
            } else if((!(longurl.startsWith("http://www.")) || !(longurl.startsWith("https://www."))) && !(longurl.includes('.',12))){
                res.json({'result':'validationError'});
            } else {
                clickHandler.insertUrl(req,res);
            }
        });
};