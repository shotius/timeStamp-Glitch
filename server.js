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
  var regDateFormat = /^\d{4}\-\d{1,2}\-\d{1,2}$/
  var regDigitsOnly = /^\d+$/
  var date = req.params["date_string"]
  
  // if date_string is empty we return time now
  if ( date === undefined ) {
    var d = new Date();    
  } else if(regDateFormat.test(date)) {
    // else if string is date format parse it in a date format
    var d = new Date(req.params.date_string); 
  } else if(regDigitsOnly.test(date)){
    // else if the string consists only from integers print it
    date = parseInt(date)
    var d = new Date(req.params.date_string)
  }
  
   
  var dat = new Date(1292112000000)
  console.log(dat)
  
  
  res.json({ unix: d,
            utc: d});
});
