$(document).ready(function(){
	$('img').click(function(){
		var num = $(this)attr("id");
		$.get("https://anapioficeandfire.com/api/houses/"+num+"/", display)
	});
	function display(data){
			var str = "";
			str += "<h1>House Details</h1>";
			str += "<p>Name: "+ data.name +"</p>";
			str += "<p>Words: "+ data.words + "</p>";
			str += "<p>Titles: "+ data.titles +"</p>";
			$("#details").html(str);
	}
});