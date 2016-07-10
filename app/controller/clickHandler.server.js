'use strict';

var apiUrl = "http://tinyurlanim-koushikkumarv.c9users.io/";
function clickHandler(db){
    var urls = db.collection('urls');
    
    this.insertUrl = function(req,res){
        
        var longUrl = req.originalUrl.slice(1);
        urls.count({},function(err,count){
            if(err){
                throw err;
            }
            count = count+1;
            urls.insert({'original_url':longUrl,'short_url':apiUrl+count},function(err){
                if(err){
                    throw err;
                }
                var result = {};
                result.original_url = longUrl;
                result.short_url = apiUrl+count;
                
                res.end(JSON.stringify(result,undefined,4));
            });
        });
    };
    
    this.redirectUrl = function(req,res){
        var short_url = apiUrl+req.params[0];
        urls.findOne({'short_url':short_url},{},function(err,doc){
            if(err){
                throw err;
            }
            res.redirect(doc.original_url);
        });
    };
    
    
}
module.exports = clickHandler;