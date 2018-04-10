var express = require('express');
var router = express.Router();
var request = require('request');

var second_request = function(dottext,res){

    var url="https://XXX.execute-api.us-east-1.amazonaws.com/mwgraphviz/test"
    request.post(
	{            
	    url:url,
            json:{
	        data: dottext
            }
	}
	,function(error, response,body){
	    var str = response.body;
            try{
	        str = str.replace(/\\"/g,'"');
                res.send(str);
            }catch(err){
                res.send(JSON.stringify(str));
            }
    })

}


router.post('/', function(req, res, next) {

    var inputText = req.body.data;

    
    var url="https://XXX.execute-api.us-east-1.amazonaws.com/mwgdbstack/stacktext"
    request.post(
	{            
	    url:url,
            json:{
	        rawData: inputText
            }
	}
	,function(error, response,body){
	    var str='';
	    try{
		str = response.body.join(" ");
		//console.log(str)
		// if server response string contains 'strict'
		// then we assume this is good result
		if( str.indexOf('strict')!=-1){
		    second_request(str,res);		
		}else{
		    res.send('error');
		}
	    }catch(err){
		res.send('error');
	    }
	    



    })

});

module.exports = router;
