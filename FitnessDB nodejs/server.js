// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var url = require('url');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html

var gegessen1={ID:"1", gname:"Nudeln", datum:"01-Jan-2017", fett:"33", eiweis:"55", Kohlenhydrate:"10", brennwert: "500"};
var gegessen2={ID:"1", gname:"Nudeln", datum:"02-Jan-2017", fett:"33", eiweis:"55", Kohlenhydrate:"10", brennwert:"1234"};
var gegessen=[gegessen1, gegessen2];

var gericht = {gname:"Nudeln", fett:"500", protein:"300", Kohlenhydrate:"100", brennwert: 150};
var gericht2 = {gname:"Mais", fett:"5001", protein:"3010", Kohlenhydrate:"1100", brennwert: 1510};
var gerichte= [gericht, gericht2];

app.get('/', function(req, res, next) {
  res.render(__dirname + '/views/index.hbs');
});

app.get('/main', function(req, res, next) {
  res.render(__dirname + '/views/main.hbs');
});

app.get('/Employe', function(req, res, next) {
  res.render(__dirname + '/views/addEmploye.hbs',{members: members});
});


var trainiert1={ID:"133", name:"Bankdrücken", datum:"01-Jan-2017", kathegorie:"Brust", reps:"55", satz:"10", gewicht: "500"};
var trainiert2={ID:"11", name:"Latzug", datum:"01-Jan-2017", kathegorie:"Brust", reps:"55", satz:"10", gewicht: "500"};
var trainiert=[trainiert1, trainiert2];

app.get('/overviewTrain', function(req, res, next) {
  
  //get Food Data from the isst table with the id in the url
  console.log("The ID is:" + url.parse(req.url, true).search);
  
  res.render(__dirname + '/views/overviewTrain.hbs', {training: trainiert});
});


app.get('/Optionen', function(req, res, next) {
  res.render(__dirname + '/views/main.hbs');
});

app.get('/profil', function(req, res, next) {
  res.render(__dirname + '/views/profil.hbs');
});

app.get('/overviewFood', function(req, res, next) {
  
  //get Food Data from the isst table with the id in the url
  console.log("The ID is:" + url.parse(req.url, true).search);
  
  res.render(__dirname + '/views/overviewFood.hbs', {food: gegessen});
});

var member1 = {id:"134", vorname:"luffi", nachname:"brazzer", gewicht:"100", anmeldedatum: 150, punkte:11, passwort:"sdfsdfsmggg", emopholen:""};
var member2 = {id:"22", vorname:"bros", nachname:"Dragan", gewicht:"45", anmeldedatum: 150, punkte:233, passwort:"sd2222222gg", emopholen:""};
var members= [member1, member2,member1, member2,member1, member2,member1, member2];
app.get('/Member', function(req, res, next) {
  res.render(__dirname + '/views/addMember.hbs', {members: members});
});
app.post('/saveNewMember', function(req, res, next){
  console.log(req.body.vorname);
  //save body things in the databse
  //res.render(__dirname + '/views/addMember.hbs', {members: members});
});


app.post('/ajax', (req,res)=>{
    console.log(req.body)  //your variables are here.
    res.status(200).json({msg:'OK'});
  ////////////save these vars in the database
  req.body.vorname;
  req.body.nachname;
  req.body.pwd;
  req.body.gewicht;
  req.body.empfohlen;
  var datetime = new Date();//change to oracle Format


});



app.post('/ajax/searchMember', (req,res)=>{
    console.log(req.body)  //your variables are here.
  
    res.json({smembers:members});
  ////////////search these vars in the database
  req.body.vorname;
  req.body.nachname;
  var datetime = new Date();//change to oracle Format
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
