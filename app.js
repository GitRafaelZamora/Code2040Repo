var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var reverse = require('reverse-string');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var github = 'https://github.com/GitRafaelZamora/Code2040Repo.git',
	API_KEY = '??????????????????????',
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

			haystack.forEach(function(element, index, array){
				if(element === needle){
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
 	request.post({url:'http://challenge.code2040.org/api/prefix', 
		form: jsonDictionary}, 
		function(error,response,body) {
			var jsonBody = JSON.parse(body);
			var	prefix = jsonBody.prefix;
			var	array = jsonBody.array;
			var	missMatch = [];
	
			for (var i = 0; i < array.length; i++) {
				if (prefix !== array[i].substring(0,4)) {
					missMatch.push(array[i]);
				}
			}

			jsonDictionary.array = missMatch;

			request.post({url:'http://challenge.code2040.org/api/prefix/validate', 
				form: jsonDictionary}, 
				function(error,response,body) {
					console.log(body);
		 		}
		 	);
 		});

 	// Step 5
 	request.post({url:'http://challenge.code2040.org/api/dating',
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

 		request.post({url: 'http://challenge.code2040.org/api/dating/validate',
 			form: jsonDictionary}, 
 			function(error, response, body){
 				console.log(body);
 			});
 	});






