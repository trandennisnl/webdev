var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 3000;


var friends = ["A", "B", "C", "D", "E", "F"];

app.get("/", function(req,res){
   res.render("home");
});

app.get("/fallinlovewith/:thing", function(req,res){
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "My adorable pet bunny", author: "Charlie"},
        {title: "Can you believe this pompsky", author: "Colt"},
    ]

    res.render("posts", {posts: posts});
})

app.post("/addfriend", function(req,res){
    var newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", function(req, res) {
    res.render("friends", {friends: friends});
});

if (process.env.PORT && process.env.IP){
  console.console.log("USING ENV VARS:",process.env.PORT, process.env.IP);
  app.listen(process.env.PORT, process.env.IP);
} else {
  console.log(`USING DEFAULT ${DEFAULT_PORT}:${DEFAULT_HOST}`);
  app.listen(DEFAULT_PORT, DEFAULT_HOST);
}
