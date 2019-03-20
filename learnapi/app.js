var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
app.use(bodyParser.urlencoded({extended:true})); // {extended:true} is a configuration option that tells the parser to use the classic encoding. When using it, values can be only strings or arrays.
app.use(express.static("public")); // serve all static files w/ express
app.set("view engine", "ejs"); // allow express to use static ejs template files

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 3000;
const API_KEY = "ab47e37bd966487d76bb2ea3d23ccf75"

// API key:
// - Your API key is ab47e37bd966487d76bb2ea3d23ccf75
// - Within the next couple of hours, it will be activated and ready to use
// - You can later create more API keys on your account page
// - Please, always use your API key in each API call
//
// Endpoint:
// - Please, use the endpoint api.openweathermap.org for your API calls
// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ab47e37bd966487d76bb2ea3d23ccf75
//
// Useful links:
// - API documentation https://openweathermap.org/api
// - Details of your plan https://openweathermap.org/price
// - Please, note that 16-days daily forecast and History API are not available for Free subscribers

app.get("/", function(req,res){
   res.render("home");
});


app.post("/weather", function(req,res) {
  var city = req.body.city;
  var country = req.body.country;
  request(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("weather", {data: data});
    } else {
      console.log(error);
      res.render("home");
    }
  });
});

app.listen(process.env.PORT || DEFAULT_PORT, process.env.IP || DEFAULT_PORT);
