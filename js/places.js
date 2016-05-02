/* ********************************************************************************************
 *   PLACES EDUPALU FONGWAMAA v.1.0 by © 2015 TRESOR NGASSAKI SITA(http://www.fongwama.com)  **
       ------------------------------------------------------------------------------
		                     Updated by Arisitide Ciriaque NDIELE 
		                     adde: search function (btn_search.click)
         					*************************************** */

 $(document).ready(function(){


	var titre="Places Edupalu Fongwama";
	var consigne="Choisissez votre centre de sante";
	var auteur="&copy; 2016 - Tresor NGASSAKI SITA, Aristide Ciriaque NDIELE";


	var previousPosition = null;

	var lat=-4.2660956;
	var lng=15.294359799999999;
     
	$("a").on("click", function(e){
		e.preventDefault();
	});

    // loading of pharmacy json database
	var db = JsonQuery(places);

    // When search by pharmacy name
    $("#btn_search").click(function() {

        // build query, condition, name like (name.$li)
        var query = "db.where({'name.$li': /" + $("#input_name").val() + "/i}).exec()";

        // build results content (construction du résultat de la recherche)
        var content = "<ul>";

        // evaluation of builded query
        results = eval(query);

        // Construction des item de la recherche (résultat)
        for (var i=0; i < results.length; i++) {

           // row ${i}
           content += "<a href='#'><li class='clearfix'>";
           //content +=  "<img src='img/"+results[i].photo +"' alt='thumb' class='thumbnail'>";
           content +=  "<h2>"+results[i].name +"</h2>";
           content +=  "<span class='desc'>"+ results[i].address + "</span>";
           content +=  "<p class='desc'>"+ results[i].city +"</p>";
           content +=  "<span class='contact'>"+ results[i].tel1 +" | "+results[i].tel2 +"</span>";
           //content +=  "<span class='desc'>"+ results[i].lat +" | "+ results[i].lon +"</span>";
           content += "</li></a>";
        }
        
        content += "</ul>";
       // alert(content);

        $("#resultat").html(content);
        //$("#results").html(content);
    });
});



/**
*Fonction d'initialisation de la carte Google Maps
*/
function initialize() {

	 document.getElementById("titre").innerHTML=titre;

    if(auteur!=""){
	     msg=document.createElement("span");
	     msg.id="author";
	     msg.innerHTML="<br />"+auteur;
	     document.getElementById("titre").appendChild(msg);
    }
    document.getElementById("instructions").innerHTML=consigne;


    map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 19,
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });   
}



/**
*test de compatibilité du navigateur avec la géolocalisation HTML
*/   
if (navigator.geolocation)
    var watchId = navigator.geolocation.watchPosition(successCallback, null, {enableHighAccuracy:true});
else
    alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");



/**
*la méthode panTo() permet de centrer la carte sur de nouvelles coordonnées
*/
function successCallback(position){
  map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
    map: map
  }); 

  if (previousPosition){
    var newLineCoordinates = [
       new google.maps.LatLng(previousPosition.coords.latitude, previousPosition.coords.longitude),
       new google.maps.LatLng(position.coords.latitude, position.coords.longitude)];
     
    var newLine = new google.maps.Polyline({
      path: newLineCoordinates,        
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    newLine.setMap(map);
  }

  previousPosition = position;