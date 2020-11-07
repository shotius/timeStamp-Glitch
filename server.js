// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  // save req.param in a varible
  var date = req.params["date_string"]
  
  // regex expressions
  var regDateFormat = /^\d{4}\-\d{1,2}\-\d{1,2}$/
  var regDigitsOnly = /^\d+$/
  
  // if date_string is empty we return time now
  if ( date === undefined ) {
    var d = new Date();    
  } else if(regDateFormat.test(date)) {
    // else if string is date format parse it in a date format
    var d = new Date(req.params.date_string); 
  } else if(regDigitsOnly.test(date)){
    // else if the string consists only from digits, treat it as miliseconds
    // from 1970 and convert it to date
    date = parseInt(date)
    var d = new Date(date)
  } else {
    // in this case date specified 
    res.json({"error" : "Invalid Date" })
  }
  
  // if code cames her that meand url were specified correctly
  res.json({ unix: d.getTime(),
            utc: d});
});
