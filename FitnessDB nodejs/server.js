// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var url = require('url');
var id;
var oracledb = require('oracledb');
var user="";
var pwd="";
oracledb.maxRows = 10000;

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));
actDate= function(){// GET CURRENT DATE
	var date = new Date();
	 
	// GET YYYY, MM AND DD FROM THE DATE OBJECT
	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth()+1).toString();
	var dd  = date.getDate().toString();
	 
	// CONVERT mm AND dd INTO chars
	var mmChars = mm.split('');
	var ddChars = dd.split('');
	 

	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";

console.log(mm);

	// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
	var datestring = (ddChars[1]?dd:"0"+ddChars[0])+'-'+ month[date.getMonth()] + '-' +  yyyy;
	return datestring;
}







app.get('/', function(req, res, next) {
    res.render(__dirname + '/views/index.hbs');
  });
  
  app.get('/main', function(req, res, next) {
    res.render(__dirname + '/views/main.hbs');
  });
  
 

app.get('/Optionen', function(req, res, next) {
  res.render(__dirname + '/views/main.hbs');
});





app.post('/ajax', (req,res)=>{
    
  req.body.empfohlen;//check ob vorhanden
  var datetime = new Date();//change to oracle Format

  var liste = [null, req.body.vorname, req.body.nachname,req.body.gewicht];
  DbConnectionlol("INSERT INTO menschen VALUES (:id, :vorname, :nachname, :gewicht)",liste,
      function(err, result){
      if(!err){
          console.log(result.rowsAffected);//if 1 ->succsesfull
      }
  });
	setTimeout(function() {
        if (req.body.empfohlen.length == 0)
	        empfohlen=null;
        else empfohlen=req.body.empfohlen;
	  //maybe a short delay?
	    var mitglied = [id, actDate(), 100, req.body.pwd, empfohlen];
	    DbConnectionlol("INSERT INTO mitglied VALUES (:mid, :anemdledatum, :punkte, :passwort, :empfohlen)",mitglied,
	      function(err, result){
	      if(!err){
		  if (result.rowsAffected) res.status(200).json({msg:'OK'});
		  else res.status(200).json({msg:'NOK'});
	      }
	    });
	}, 1000);
});



app.post('/ajax/searchMember', (req,res)=>{
var members=[];
  var searchopt=[req.body.vorname, req.body.nachname];
  DbConnectionlol("SELECT * FROM view_member_node WHERE vorname=:vorname or nachname=:nachname ",searchopt, function(err, result){
      if(!err ){
          console.log(result); 
	for( i = 0; i<result.rows.length;i++){
                    members[i]={placeholder:"0"};
                    members[i]["id"]=result.rows[i][0];
                    members[i]["anmeldedatum"]=result.rows[i][1];
                    members[i]["punkte"]=result.rows[i][2];
                    members[i]["passwort"]=result.rows[i][3];
                    members[i]["emfpholen"]=result.rows[i][4];//5 wäre nochmal die id
                    members[i]["vorname"]=result.rows[i][6];
                    members[i]["nachname"]=result.rows[i][7];

                    members[i]["gewicht"]=result.rows[i][8];
        }res.json({smembers:members});
      }    
  });
  //maybe a format change is needed

});










/////////////////////////
/////////////////////
/////           Training ///////
////////////////////////////////
app.get('/overviewTrain', function(req, res, next) {
    var trainiert=[];
  var id=url.parse(req.url, true).search;
  id=id.substring(1);
    DbConnection("SELECT * FROM training WHERE id=:id",id, function(err, result){
	if(!err){
        console.log(result)
        for(i = 0; i<result.length;i++){
            trainiert[i]={placeholder:"0"};
            trainiert[i]["id"]=result[i][0];
            trainiert[i]["datum"]=result[i][1];
            trainiert[i]["name"]=result[i][2];
            trainiert[i]["gewicht"]=result[i][3];
            trainiert[i]["reps"]=result[i][4];
            trainiert[i]["kathegorie"]=result[i][5];
        }
	}res.render(__dirname + '/views/overviewTrain.hbs', {training: trainiert,id:id});
    });
  
});



///////////////////////
////////////////////////////////////
/////////////       Food            /////////////////////
//////////////////////////

app.get('/overviewFood', function(req, res, next) {
    
  var id=url.parse(req.url, true).search;
  id=id.substring(1);
  var gegessen=[];
        DbConnection("SELECT * FROM isst WHERE id=:id", id, function(err, result){
            if(!err){
                console.log(result);
                for(i = 0; i<result.length;i++){
                    gegessen[i]={placeholder:"0"};
                    gegessen[i]["id"]=result[i][0];
                    gegessen[i]["name"]=result[i][1];
                    gegessen[i]["datum"]=result[i][2];
                    gegessen[i]["menge"]=result[i][3];
                }
            }   res.render(__dirname + '/views/overviewFood.hbs', {food: gegessen,id:id});
        });
 
});






///////////////////////////////
//////////// Hinzufügen eines Mitarbeiters
///////////////////////////
////////////////////
/*
var liste = [null, 'Chris', 'Un',45];
DbConnectionlol("INSERT INTO menschen VALUES (:id, :vorname, :nachname, :gewicht)",liste,
	function(err, result){
	if(!err){
		console.log(result.rowsAffected);//if 1 ->succsesfull
	}
});

var mitarbeiter = [id, 5, '7654'];
DbConnectionlol("INSERT INTO mitarbeiter VALUES (:mid, :rang, :personalnummer)",mitarbeiter,
	function(err, result){
	if(!err){
		console.log(result.rowsAffected);//if 1 ->succsesfull
	}
}); 

*/
//////////////////
//////////////////////
//////Mitarbeiter////////////////////////////
////////////////////////////////////
app.get('/Employe', function(req, res, next) {
    var members=[];
    DbConnectionSAll("SELECT * FROM view_employe_node", function(err, result){//not testet
        if(!err){
                for(i = 0; i<result.length;i++){
                    members[i]={placeholder:"0"};
                    members[i]["id"]=result[i][0];
                    members[i]["rang"]=result[i][1];
                    members[i]["personalnummer"]=result[i][2];//3 wäre nochmal die id
                    members[i]["vorname"]=result[i][4];
                    members[i]["nachname"]=result[i][5];
                    members[i]["gewicht"]=result[i][6];
                }
        }    res.render(__dirname + '/views/addEmploye.hbs',{members: members});
    });

  });





////////////////////////////////////////
//////////////////////////////
//Profil
/////////////////////////////////
app.get('/profile', function(req, res, next) {
    var id=url.parse(req.url, true).search;
    id=id.substring(1);
console.log(id);
    app.post('/profileDataMember', function(req, res, next) {
 console.log(req.body.id);       
        var i=0;
        DbConnection("SELECT * FROM view_member_node WHERE id=:id", req.body.id, function(err, result){      
            if(!err){console.log(result);
                //algo
                        var profil=[];
                        profil[0]={placeholder:"0"};
                        profil[0]["id"]=result[i][0];
                        profil[0]["anmeldedatum"]=result[i][1];
                        profil[0]["punkte"]=result[i][2];
                        profil[0]["passwort"]=result[i][3];
                        profil[0]["emfpholen"]=result[i][4];//5 wäre nochmal die id
                        profil[0]["vorname"]=result[i][6];
                        profil[0]["nachname"]=result[i][7];
                        profil[0]["gewicht"]=result[i][8];
                    }res.json({profil:profil});
            
        })
    });
    app.post('/profileDataIsst', function(req, res, next) {

        DbConnection("SELECT COUNT(ID) FROM isst WHERE id=:id", req.body.id, function(err, result){
                if(!err){

                    var profil=[];
                    profil[0]={placeholder:"0"};
                    profil[0]["isst"]=result[0][0];
                    res.json({profil:profil});
                }
                else
                    profil[0]["isst"]=-1;
                
        })
    });
    app.post('/profileDataTraining', function(req, res, next) {
       
        DbConnection("SELECT COUNT(ID) FROM training WHERE id=:id",req.body.id, function(err, result){
            if(!err){
                var profil=[];
                profil[0]={placeholder:"0"};
                profil[0]["trainiert"]=result[0][0];
                res.json({profil:profil});
            }else
                profil[0]["trainiert"]=-1;
        });  
    });
res.render(__dirname + '/views/profile.hbs');
});






////////////////////////////////////////
//////////////////////////////
//Mitglieder ALL
/////////////////////////////////
app.get('/Member', function(req, res, next) {
    var members=[];
    DbConnectionSAll("SELECT * FROM view_member_node", function(err, result){      
        if(!err){
            //algo
                for( i = 0; i<result.length;i++){
                    members[i]={placeholder:"0"};
                    members[i]["id"]=result[i][0];
                    members[i]["anmeldedatum"]=result[i][1];
                    members[i]["punkte"]=result[i][2];
                    members[i]["passwort"]=result[i][3];
                    members[i]["emfpholen"]=result[i][4];//5 wäre nochmal die id
                    members[i]["vorname"]=result[i][6];
                    members[i]["nachname"]=result[i][7];
                    members[i]["gewicht"]=result[i][8];
                }
        }res.render(__dirname + '/views/addMember.hbs', {members: members});
    });  
});







DbConnection = function (query, name, callback){
	oracledb.getConnection(
	 	{
		   connectString : "oracle-lab.cs.univie.ac.at/LAB.CS.UNIVIE.AC.AT",
		   user : user,
		   password : pwd
	 	},
	 	function(err, connection){
              if(err){console.log(err.message);return;}
		    connection.execute(
            	query,
                [name],
                function(err, result)
                {
                    if (err) { console.error(err.message); return; }
                    else if(result){
                        return callback(null, result.rows);
                    }
               
		connection.close(
		      function(err)
		      {
			if (err) { console.error(err.message); }
		      }); 
		}
            );
        }
    );
};





DbConnectionlol = function (query, list, callback){
	oracledb.getConnection(
	 	{
		   connectString : "oracle-lab.cs.univie.ac.at/LAB.CS.UNIVIE.AC.AT",
		   user : user,
		   password : pwd
	 	},
	 	function(err, connection){
            if(err){console.log(err.message);return;
                }
		    connection.execute(
            	query,
                list,
		        { autoCommit: true},
                function(err, result)
                {
                    if (err) { console.error(err.message); return; }
                    else if(result){
                        return callback(null, result);
                    }
                }
            );
            connection.execute(
                "SELECT sequenz_id.currval FROM dual",
                function(err, res)
                {
                    if (err) { console.error("ERRROR"+err.message); 
                        return; 
                    }else if(res){
                        id=res.rows[0][0];
                        console.log("Neues id:"+ res.rows[0]);
                    }
                    setTimeout(function() {

			connection.close(
		      		function(err){
			if (err) { console.error(err.message); }
		      	}); }, 3000);
                }
            );
        }
    );
}


DbConnectionSAll = function (query, callback){
	oracledb.getConnection(
	 	{
		   connectString : "oracle-lab.cs.univie.ac.at/LAB.CS.UNIVIE.AC.AT",
		   user : user,
		   password : pwd
	 	},
	 	function(err, connection){
              		if(err){console.log(err.message);return;}
		    	connection.execute(
            		query,
               		function(err, result){
                    		if (err) { console.error(err.message); return; }
                    		else if(result){
                       			return callback(null, result.rows);
                    	}             
			setTimeout(function() {

			connection.close(
		      		function(err){
			if (err) { console.error(err.message); }
		      	}); }, 3000);
		}
            );
        }
    );
};


var listener = app.listen(3000, function(){
   console.log('Yoour app is listening on port' + 3000);
});

