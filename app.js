// //jshint esversion:6
// const express=require("express");
// const app=express();
// const bodyParser=require("body-parser");
// const session=require("express-session");
// app.use(bodyParser.urlencoded({extended:true}));
// app.set('view engine','ejs');
// app.use(express.static("public"));
// var items=[];
// app.get("/",function(req,res,next){
//     var day="";
//     var options={weekday:'long',day:'numeric',month:'long'};
//     var today=new Date();
//     day=today.toLocaleDateString("en-US",options);
//     res.render("lists",{kindOfDay:day,newItems:items});
// })
// app.post("/",function(req,res){
//     var item=req.body.newItem;
//     items.push(item);
//     res.redirect("/");
// })
// app.listen(3000, function(){
//     console.log("server is ready on 3000");
// })


const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Use session middleware with a store option
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new session.MemoryStore(),
  })
);

app.get("/", function (req, res) {
  var day = "";
  var options = { weekday: "long", day: "numeric", month: "long" };
  var today = new Date();
  day = today.toLocaleDateString("en-US", options);

  // Reset items array in session on first page load
  if (!req.session.isInitialized) {
    req.session.isInitialized = true;
    req.session.items = [];
  }

  res.render("lists", { kindOfDay: day, newItems: req.session.items });
});

app.post("/", function (req, res) {
  var item = req.body.newItem;
  req.session.items.push(item);

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});








