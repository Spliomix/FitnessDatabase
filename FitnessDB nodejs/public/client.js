// Get the modal
var init=false;
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var vname = document.getElementsByName("vorname")[0];
var nname = document.getElementsByName("nachname")[0];
var pwd = document.getElementsByName("passwort")[0];
var weight = document.getElementsByName("gewicht")[0];
var recomID = document.getElementsByName("empfohlen")[0];
$(document).ready(function () {
    $.each($('.navbar').find('li'), function() {
      if($(this).find('a').attr('href') == window.location.href.split('#')[0]){
        $(this).addClass('active');
      }else{
        $(this).removeClass('active');
      }
    });
if (!init){

if(window.location.href.split('?')[0]=="http://localhost:3000/profile"){
     var data={"id":window.location.href.split('?')[1]};
console.log(data.id);
    $.ajax({
      url : "http://localhost:3000/profileDataMember",
      type: "POST",
      dataType:'json',
      data : data,
      success: function(data){
 	      $("#id").text("ID: "+ data.profil[0].id );
        $("#name").text("Name: "+data.profil[0].vorname+" "+data.profil[0].nachname);
        $("#gewicht").text("Gewicht: "+data.profil[0].gewicht+"kg");
        $("#date").text("Anmeldedatum: "+data.profil[0].anmeldedatum);
if (data.profil[0].emfpholen!=null)
$("#empfohlen").text("Empohlen von ID: "+data.profil[0].emfpholen);
        $("#test-circle").circliful({
          animation: 1,
          animationStep: 5,
          foregroundBorderWidth: 15,
          backgroundBorderWidth: 15,
          percent: data.profil[0].punkte/10,
          textSize: 28,
          textStyle: 'font-size: 12px;',
          textColor: '#666',
          multiPercentage: 1,
          percentages: [10, 20, 30],
	        text:"Punkte",
	        textBelow:true
        });       
      },
    });
    $.ajax({
      url : "http://localhost:3000/profileDataTraining",
      type: "POST",
      dataType:'json',
      data : data,
      success: function(data){
        var elem = document.getElementById("myBarTrain");  
        elem.style.backgroundColor = "Aquamarine"; 
        var width = 0;
        var id = setInterval(frame, 10);
        function frame() {
          if (width >= data.profil[0].trainiert) {
            clearInterval(id);
          } else {
            width++; 
            elem.style.width = width+ '%'; 
            elem.innerHTML = width * 1;
          }
        }
      },
    });
    $.ajax({
      url : "http://localhost:3000/profileDataIsst",
      type: "POST",
      dataType:'json',
      data : data,
      success: function(data){
        var elem = document.getElementById("myBarIsst"); 
        elem.style.backgroundColor = "Crimson";  
        var width = 0;
        var id = setInterval(frame, 10);
        function frame() {
          if (width >= data.profil[0].isst) {
            clearInterval(id);
          } else {
            width++; 
            elem.style.width = width+ '%'; 
            elem.innerHTML = width * 1;
          }
        }
      },
    });
}



}
    init =true;
});
// When the user clicks on the button, open the modal 
if(btn !== null){
  btn.onclick = function() {
      $(modal).fadeIn();
      $(vname).removeClass('error');
      $(nname).removeClass('error');
      $(pwd).removeClass('error');
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      $(modal).fadeOut();
  }





  //Input Valdidation
  document.getElementById("save").onclick = function(event){

    var error=false;

    if(vname.value.length == 0){
      $(vname).addClass('error');
      error=true;
    }else{
      $(vname).removeClass('error');
    }

    if(nname.value.length == 0){
      $(nname).addClass('error');
      error=true;
    }else{
      $(nname).removeClass('error');
    }

    if(pwd.value.length == 0 || isNaN(pwd.value)){//check if number
      $(pwd).addClass('error');
      error=true;
    }else{
      $(nname).removeClass('error');
    }

    if(!error){
      $(modal).fadeOut();  
      var data={"vorname": vname.value, "nachname": nname.value, "pwd": pwd.value, "gewicht": weight.value, "empfohlen": recomID.value};
          $.ajax({
              url : "http://localhost:3000/ajax",
              type: "POST",
              dataType:'json',
              data : data,
              success: function(data){
                console.log(data.msg);
                if(data.msg=="OK")
                  window.location = "localhost:3000/Member";
                else
                  alert("Server did not get the data")

              },
          });
    }
  }
}

//Show the ID Number

// Get the modal
var searchModal = document.getElementById('mySearchModal');

// Get the button that opens the modal
var searchbtn = document.getElementById("searchbtn");

// Get the <span> element that closes the modal
var spanSearch = document.getElementsByClassName("sclose")[0];


var svname = document.getElementsByName("svorname")[0];
var snname = document.getElementsByName("snachname")[0];

if(searchbtn !== null){
// When the user clicks on the button, open the modal 
    searchbtn.onclick = function() {
        $(searchModal).fadeIn();
      //maybe i dont need this because of comfort
        var myNode = document.getElementById("searchList");
        while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
      }
    }

    // When the user clicks on <span> (x), close the modal
    spanSearch.onclick = function() {
        $(searchModal).fadeOut();
    }

  // When the user clicks anywhere outside of the modal, close it
  
  }
window.onclick = function(event) {
      if (event.target == searchModal) {
         $(searchModal).fadeOut();
      }
        if (event.target == modal) {
         $(modal).fadeOut();
      }
  document.getElementById("searchStartbtn").onclick = function() {
    //delite the old searches
    var myNode = document.getElementById("searchList");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
	var error;
      	var data={"vorname": svname.value, "nachname": snname.value};
	
	if(snname.value.length == 0 && svname.value.length == 0 ){
	     	$(snname).addClass('error');
		$(svname).addClass('error');
	      error=true;
	    }else{
		error=false;
	     	$(snname).removeClass('error');
		$(svname).removeClass('error');
	    }
	if(!error)
          $.ajax({
              url : "http://localhost:3000/ajax/searchMember",
              type: "POST",
              dataType:'json',
              data : data,
              success: function(data){
                //create Table
                //maybe should be in a function?
                  var table = document.createElement("table");
                  table.className = "table table-hover";
                  var thead = document.createElement("thead");
                  table.appendChild(thead);
                  var tr = document.createElement("tr");
                  thead.appendChild(tr);
                  var tname=[];
                  tname[1] = document.createTextNode("Firstname");
                  tname[2] = document.createTextNode("Lastname");
                  tname[0] = document.createTextNode("ID");
		              tname[3] = document.createTextNode("Anmdeldedatum");
                  var th=[];
                  for (let i = 0; i < 4; ++i) { //Anzahl der Spalten
                  th[i]= document.createElement("th");
                  tr.appendChild(th[i]);
                  th[i].appendChild(tname[i]);
                  }


                  var td=[];
                  var tr=[];
                  var t=[];
                  var tbody = document.createElement("tbody");
                  table.appendChild(tbody);

                  var a; 
                  for (let index = 0; index < data.smembers.length; ++index) { 
                    t[0] = document.createTextNode(data.smembers[index].id);                  
                    t[1] = document.createTextNode(data.smembers[index].vorname);
                    t[2] = document.createTextNode(data.smembers[index].nachname);
		                t[3] = document.createTextNode(data.smembers[index].anmeldedatum);   
                    tr[index] = document.createElement("tr"); 
                    tbody.appendChild(tr[index]);
                    a = document.createElement("a");
                    a.setAttribute("href", "#"+ data.smembers[index].id);
                    a.setAttribute("onclick", "doWork()");
                    for (let i = 0; i < 4; ++i) { //Anzahl der Spalten
                      td[i]= document.createElement("td");
                      tr[index].appendChild(td[i]); 
                      if(i){
                        td[i].appendChild(t[i]);                     
                      }else{
                        a.appendChild(t[i]); 
                        td[i].appendChild(a);
                      }

                      tr[index].appendChild(td[i]); 
                    }

                  }
                  document.getElementById("searchList").appendChild(table); 

              },
          });
  }
}

var doWork=function(){
  var delayInMilliseconds = 1000; //1 second

setTimeout(function() {
    var str = window.location.href;
  str = str.substring(str.indexOf("#") + 1);
  recomID.value=str;
  $(searchModal).fadeOut();
}, delayInMilliseconds);
 
};



