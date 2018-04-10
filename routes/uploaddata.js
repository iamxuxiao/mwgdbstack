var express = require('express');
var router = express.Router();
var request = require('request');


router.post('/', function(req, res, next) {


    var url="https://xxx.execute-api.us-east-1.amazonaws.com/mwgraphviz/upload";
    request.post(
	{            
 	    url:url,
            json:{
	        "data": req.body.data
           } 
	}
	,function(error, response,body){

	    var str = response;
            res.send(str.body);
 	    
	});
});

module.exports = router;
