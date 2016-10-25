var request = require("request");
var http = require("http");
var reverse = require("reverse-string");

var github = "https://github.com/GitRafaelZamora/Code2040Repo.git";
var	API_KEY = "88e4941e9c84e7e092278e5b6dd24d9c";
var	jsonDictionary = {
        "token"   : API_KEY,
        "github"  : github
    };

//	Step 1
    request.post({url:"http://challenge.code2040.org/api/register", 
	    form: jsonDictionary}, 
	    function(error,response,body) {
		    console.log(body);
        }
    );

 	//Step 2
    request.post({url:"http://challenge.code2040.org/api/reverse", 
        form: jsonDictionary}, 
        function(error,response,body) {
            var revBody = reverse(body);
            jsonDictionary.string = revBody;
            request.post({url:"http://challenge.code2040.org/api/reverse/validate",
                form: jsonDictionary},
                function(error,response,body){
                    console.log(body);
                });
        }
    );

 	//Step 3
    request.post({url:"http://challenge.code2040.org/api/haystack",
        form: jsonDictionary},
        function(error,response,body){
            var jsonBody = JSON.parse(body);
            var needle   = jsonBody.needle;
            var haystack = jsonBody.haystack;
            haystack.forEach(function(element, index, array){
                if(element === needle){
                    jsonDictionary.needle = index;
                    request.post({url:"http://challenge.code2040.org/api/haystack/validate", 
    	                form: jsonDictionary}, 
    	                function(error,response,body) {
    	                	console.log(body);
                        }
    			 	);
                }
            })
        });



//	Step 4
 	request.post("http://challenge.code2040.org/api/prefix", 
		{json: jsonDictionary}, 
		function(error,response,body) {
      if (!error && response.statusCode == 200) {
        var jsonBody = JSON.stringify(body);
        jsonBody = JSON.parse(jsonBody);
        var prefix = jsonBody.prefix;
        var array = jsonBody.array;
        var missMatch = [];

        array.forEach(function(element, index, array){
          if (prefix !== element.substring(0,4)) {
            missMatch.push(element);
          }
        })

        jsonDictionary.array = missMatch;
        //console.log(jsonDictionary);

        request.post("http://challenge.code2040.org/api/prefix/validate", 
          {json: jsonDictionary}, 
          function(error,response,body) {
            if (!error && response.statusCode == 200){
              console.log(body);
            }
          }
        )
      } else {
        console.log(error);
      }
 	});

 	// Step 5
 	request.post({url:"http://challenge.code2040.org/api/dating",
 		form: jsonDictionary},
 		function(error,response,body) {
 			var jsonBody = JSON.parse(body);
 			var dateString = jsonBody.datestamp;
 			var interval = jsonBody.interval;

 			var seconds = (Date.parse(dateString) / 1000) + interval;

 			var milliseconds = seconds * 1000;

 			var date = new Date(milliseconds).toISOString();
 			date = date.substring(0,19) + "Z";

			jsonDictionary.datestamp = date;

 		request.post({url: "http://challenge.code2040.org/api/dating/validate",
 			form: jsonDictionary}, 
 			function(error, response, body){
 				console.log(body);
 			});
 	});







