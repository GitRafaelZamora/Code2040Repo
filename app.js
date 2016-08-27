var request = require("request"),
    bodyParser = require('body-parser'),
    reverse = require('reverse-string');

var github = 'https://github.com/GitRafaelZamora/Code2040Repo.git',
	API_KEY = '88e4941e9c84e7e092278e5b6dd24d9c',
	jsonDictionary = {
		'token'   : API_KEY,
		'github'  : github
	};

	//Step 1
	request.post({url:'http://challenge.code2040.org/api/register', 
		form: jsonDictionary}, 
		function(error,response,body) {
			console.log(body);
 		}
 	);

 	//Step 2
	request.post({url:'http://challenge.code2040.org/api/reverse', 
		form: jsonDictionary}, 
		function(error,response,body) {
			//console.log(body);
			var revBody = reverse(body);
			//console.log(revBody);
			jsonDictionary.string = revBody;
			request.post({url:'http://challenge.code2040.org/api/reverse/validate',
				form: jsonDictionary},
				function(error,response,body){
					console.log(body);
				});
 		}
 	);

 	//Step 3
 	request.post({url:'http://challenge.code2040.org/api/haystack',
		form: jsonDictionary},
		function(error,response,body){
			var jsonBody = JSON.parse(body),
				needle   = jsonBody.needle,
				haystack = jsonBody.haystack;
			// console.log(needle);
			// console.log(haystack);
			haystack.forEach(function(element, index, array){
				if(element === needle){
					//console.log("Match! " + element + " = " + needle + index);
					jsonDictionary.needle = index;
					request.post({url:'http://challenge.code2040.org/api/haystack/validate', 
						form: jsonDictionary}, 
						function(error,response,body) {
							console.log(body);
				 		}
				 	);
				}
			})
		});

 	// Step 4
	// Great job -- but we’re not done with collections.
	// In this challenge, the API is going to give you another dictionary. The first value, prefix, is a string. The second value, array, is an array of strings. Your job is to return an array containing only the strings that do not start with that prefix.
	// Note: The strings in your array should be in the same order as in the original array.
	// POST your token here:
	// http://challenge.code2040.org/api/prefix
	// Once you’ve built your array, POST a dictionary here:
	// http://challenge.code2040.org/api/prefix/validate
	// Use the key token for your token.
	// Use the key array for your array.
	// Hint: You’ll need a little string-fu to complete this challenge. But rest assured: comparing the beginnings of strings is a common task. Your platform’s standard libraries might even have some code to help you do this.
 	request.post({url:'http://challenge.code2040.org/api/prefix', 
		form: jsonDictionary}, 
		function(error,response,body) {
			// console.log(body);
			var jsonBody = JSON.parse(body),
				prefix = jsonBody.prefix,
				array = jsonBody.array,
				missMatch = Array();
				
			console.log(jsonBody);

			for (var i = 0; i < array.length; i++) {
				if (prefix !== array[i].substring(0,4)) {
					missMatch.push(array[i]);
				}
			}

			console.log(jsonBody)

			request.post({url:'http://challenge.code2040.org/api/prefix/validate', 
				form: jsonDictionary}, 
				function(error,response,body) {
					console.log(body);
		 		}
		 	);
 		}
 	);