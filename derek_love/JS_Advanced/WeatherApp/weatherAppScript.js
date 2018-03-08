$(document).ready(function(){
	$('form').submit(function(){
		var city = $('#city').val();
		var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&&appid=adb33da2331752f4701b5a9adc6e6d94"
		$.get(url, function(res){
			var html_str = '';
			var temp = Math.floor((9/5)*(res.main.temp -273) +32);
			html_str += '<h1>' + city + '</h1>';
			html_str += '<h3>Current Temperature: ' + temp + '</h3>';
			$('#cityandtemp').html(html_str);
		}, 'json');
		return false;
	});
});