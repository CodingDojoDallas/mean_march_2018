
$(document).ready(function(){
	$('img').click(function(){
		var num = $(this).attr('alt');
		$.get("https://anapioficeandfire.com/api/houses?name="+num, displayhouse)
		
	});
	function displayhouse(data){
		var house = data[0];
		console.log(house);
		var got_str = "";
		got_str +=`<p>Name: ${house.name}</p>`
		got_str +=`<p>Words: ${house.words}</p>`
		got_str +=`<p>Titles:   ${house.titles} </p>`
		$('#gotinfo').html(got_str)
		
	}

});

// console.log(`speed: ${this.speed}`);

// https://anapioficeandfire.com/api/characters/583

	// var crest = document.getElementById(id);
	// return{
	// 	click: function(callback){
	// 		element.AddEventListener("click", callback);
	// 		var num = $(this).attr('id');
	// 		$.get("https://anapioficeandfire.com/api/houses"+num+"/", displayhouse)
			
	// 	}

	// }