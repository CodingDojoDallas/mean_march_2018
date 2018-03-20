$(document).ready(function (){
	var button = document.getElementById("button");
	button.addEventListener("click", hunt);
	function hunt(){
		alert("searching!");
		$.get("https://api.github.com/users/Chillzn", displayname);
	}
	function displayname(data){
		$("#displayname").html(data.login);
	}
});