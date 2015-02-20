/*
Rox& Server Documentation

Functions in this file:

Gets the server up and running. node is the best. <3 <3 


 Module dependencies:

 - Express
 - Http (server yayyyy)
 - Body parser (?? do I need this)
 - Underscore (because it's cool)
 - Socket.IO

 */


var express     = require("express"),
    app         = express(),
    http        = require("http").createServer(app),
    bodyParser  = require("body-parser"),
    io          = require("socket.io").listen(http),
    _           = require("underscore");


/* Server config */

//Server's IP address
app.set("ipaddr", "127.0.0.1");

//Server's port number
app.set("port", 8080);

//Specify where the static content is
app.use(express.static("public", __dirname + "/public"));

//Tells server to support JSON requests
app.use(bodyParser.json());

/* Server routing */

//Handle route "GET /", as in "http://localhost:8080/"
app.get("/", function(request, response) {
    res.sendFile(__dirname + '/public/index.html');

});


//Start the http server at port and IP defined before
http.listen(app.get("port"), app.get("ipaddr"), function() {
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});