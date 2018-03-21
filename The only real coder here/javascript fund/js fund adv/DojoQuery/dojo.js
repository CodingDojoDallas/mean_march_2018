$(document).ready(function(){
	var $Dojo = function(id){
		var rekdatbody = document.getElementById(id);
		return {
			click: function(callback){
				rekdatbody.addEventListener("click", callback);
			},
			hover: function(callback){
				rekdatbody.addEventListener("mouseover", callback);
			},
		};
	};
	$Dojo("button").click(function() { console.log("The button was clicked!") });
	$Dojo("anotherbutton").hover(function() { console.log("The button was hovered on!") });
});