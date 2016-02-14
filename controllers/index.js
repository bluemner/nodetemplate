// =================================================
//
//    Name : index.js
//    Author : Brandon Bluemner
//    Description : handels all code related to the controller
//
// =================================================
module.exports.controller = function(app, SERVER_STATUS, path) {
	
	// -------------------------------------------------
	// SET FAVICON LOCATION
	// -------------------------------------------------
	app.get('/favicon.ico', function (request, responce) {
		responce.sendFile(path.join(__dirname, '../','www/img/favicon.ico'));
	});
	
	// -------------------------------------------------
	//  Set The index file location
	// -------------------------------------------------
	app.get('/', function (request, responce) {
		responce.sendFile(path.join(__dirname,'../', 'www/index.html'));
	});
	
	// -------------------------------------------------
	//   Handling wrong urls
	// -------------------------------------------------
	app.get("/*", function (req, res) {
		res.sendFile(path.join(__dirname, '../', 'www/index.html'));
		console.log("bad Url:" + req.url);
	});

}