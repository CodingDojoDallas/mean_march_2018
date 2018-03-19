$(document).ready(function(){

 var _ = {
	info: function(data){
		console.log(data);
		
	}
	}
	var getinfo = $.get("https://api.github.com/users/wittrock96",function(data){return $('#myname').html(data.login)})
	})

