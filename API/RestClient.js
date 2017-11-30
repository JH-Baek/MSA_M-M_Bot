var request = require('request');

exports.getMusicAPIData = function getData(url, session, callback){
    
        request.get(url, function processGetRequest(err,res,body){
            if(err){
                console.log(err);
            }else {
                callback(body, session);
            }
        });
    };

    exports.getFavouriteMovie = function getData(url, session, username, callback){
        request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
            if(err){
                console.log(err);
            }else {
                callback(body, session, username);
            }
        });
    };
    
    exports.deleteFavouriteMovie = function deleteData(url, session, username ,favouriteMovie, id, callback){
        var options = {
            url: url + "\\" + id,
            method: 'DELETE',
            headers: {
                'ZUMO-API-VERSION': '2.0.0',
                'Content-Type':'application/json'
            }
        };
    
        request(options,function (err, res, body){
            if( !err && res.statusCode === 200){
                console.log(body);
                callback(body,session,username, favouriteMovie);
            }else {
                console.log(err);
                console.log(res);
            }
        })
    
    };
    
    exports.postFavouriteMovie = function getData(url, username, favouriteMovie){
        var options = {
            url: url,
            method: 'POST',
            headers: {
                'ZUMO-API-VERSION': '2.0.0',
                'Content-Type':'application/json'
            },
            json: {
                "username" : username,
                "favouriteMovie" : favouriteMovie
            }
          };
          
          request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
            }
            else{
                console.log(error);
            }
          });
    };

    exports.getFavouriteMusic = function getData(url, session, username, callback){
        request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
            if(err){
                console.log(err);
            }else {
                callback(body, session, username);
            }
        });
    };

    exports.postFavouriteMusic = function getData(url, username, favouriteMusic){
        var options = {
            url: url,
            method: 'POST',
            headers: {
                'ZUMO-API-VERSION': '2.0.0',
                'Content-Type':'application/json'
            },
            json: {
                "username" : username,
                "favouriteMusic" : favouriteMusic
            }
          };
          
          request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
            }
            else{
                console.log(error);
            }
          });
    };

    exports.deleteFavouriteMusic = function deleteData(url, session, username ,favouriteMusic, id, callback){
        var options = {
            url: url + "\\" + id,
            method: 'DELETE',
            headers: {
                'ZUMO-API-VERSION': '2.0.0',
                'Content-Type':'application/json'
            }
        };
    
        request(options,function (err, res, body){
            if( !err && res.statusCode === 200){
                console.log(body);
                callback(body,session,username, favouriteMusic);
            }else {
                console.log(err);
                console.log(res);
            }
        })
    
    };
