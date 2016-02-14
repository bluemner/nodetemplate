// =================================================
//
//    Name : server.js
//    Author : Brandon Bluemner
//    Description : Create the website & handlers
//
// =================================================
var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');
// =================================================

var HTTPS_PORT = 4443;
var HTTP_PORT = 8090;

var SERVER_STATUS = {
    SERVER_NAME: '',
    SERVER_MESSAGE: '',
    SERVER_CODE: 0
}
// -------------------------------------------------
// OPTION FOR SSL 
// -------------------------------------------------
var options = {
  //ca: fs.readFileSync(''),
 // key: fs.readFileSync(''),
  //cert: fs.readFileSync('')
};

// =================================================

// -------------------------------------------------
//  Server
// -------------------------------------------------
var getServerStatus = function () {
  return [{
    websitename: SERVER_STATUS.SERVER_NAME,
    code: SERVER_STATUS.SERVER_CODE,
    message: SERVER_STATUS.SERVER_MESSAGE
  },
    {
      websitename: "abs",
      code: 0,
      message: "test"
    }];
}

// -------------------------------------------------
//  Creates online json
// -------------------------------------------------
var onlineToJSON = function ( websitename, code, message )
{
  var s = '{\n' +
    '\t"websitename" : "' + websitename + '"' + ',\n' +
    '\t"code" : ' + code + ' ,\n' +
    '\t"message" : "' + message + '"\n' +
    '}\n';
  return s;
}

// -------------------------------------------------
//  websites : 
// -------------------------------------------------
var websitesToJSON = function ( websites ) 
{
  var s = '{\n' +
    '"websites":[\n';
  websites.forEach(function (website, index, array) {
    s += onlineToJSON(website.websitename, website.code, website.message);
    s += ',';
  })
  s = s.substring(0, s.length - 1);
  s += ']\n}\n'
  return s;
}

// -------------------------------------------------
//    APPEND HTML TO FILE NAMES
// -------------------------------------------------
app.use(function ( req, res, next ) 
{
  if (req.path.indexOf('.') === -1) {
    var file = __dirname + '/www' + req.path + '.html';
    fs.exists(file, function (exists) {
      if (exists)
        req.url += '.html';
      next();
    });
  }
  else
    next();
});



// -------------------------------------------------
//  SET ROOT WWW LOCATION
// -------------------------------------------------
app.use('/', express.static(__dirname + '/www'));

// -------------------------------------------------
//   
// -------------------------------------------------
app.get('/Status', function (request, responce) {
  responce.send(websitesToJSON(getServerStatus()));
});

// -------------------------------------------------
//  Gets The JSON If The Server Is Online
// -------------------------------------------------
app.get('/online', function (request, responce) {
  responce.send(onlineToJSON(SERVER_STATUS.SERVER_NAME, SERVER_STATUS.SERVER_CODE,SERVER_STATUS.SERVER_MESSAGE));
});

// -------------------------------------------------
//  
// -------------------------------------------------
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      var route = require('./controllers/' + file);
      route.controller(app, SERVER_STATUS, path);
  }
});

// -------------------------------------------------
//   Create Server NON-SSL
// -------------------------------------------------
http.createServer(app.handle.bind(app)).listen(HTTP_PORT, function () {
  console.log("Express server listening on port " + HTTP_PORT);
});

// -------------------------------------------------
//   Create Server SSL
// -------------------------------------------------
//https.createServer(options, app.handle.bind(app)).listen(HTTPS_PORT, function () {
//  console.log("Express server listening on port " + HTTPS_PORT);
//});