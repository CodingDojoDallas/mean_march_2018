$(document).ready(function () {
	$('img').click(function(){
		var num = $(this).attr('id');
		$.get("https://anapioficeandfire.com/api/houses/" + num + "/", displayHouse)
	});

	function displayHouse(data){
		var html_str = "";
		html_str += '<h1>House Details</h1>';
		html_str += '<p>Name: ' + data.name + '</p>';
		html_str += '<p>Words: ' + data.words + '</p>';
		html_str += '<p>Titles: ' + data.titles + '</p>';
		$('#detail').html(html_str);
	}
});

