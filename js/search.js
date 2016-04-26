$(document).ready(function(){
     
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