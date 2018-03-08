$(document).ready(function () { 

	var button = document.getElementById('name')
	// add click function to <button id='name'> and perform callback getHub
	button.addEventListener('click', getHub);
	// gets all JSON info from github api and performs callback displayName
	function getHub() {
		$.get("https://api.github.com/users/dslove10", displayName)
	}
	// add value of login from github api to <h1 id='displayName'>
	function displayName(data){
		$('#displayName').html(data.login);
	}
});