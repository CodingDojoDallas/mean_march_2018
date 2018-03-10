$(document).ready(() => {

	$('img').click(() => {
		let id = $('img').attr('id');
		$.get('https://anapioficeandfire.com/api/houses/'+id+'/' , (res) => {

			console.log(res);
			console.log("You have chosen "+res.name)

			// $('#name').html(`${res.name}`);
			// $('#words').html(`${res.words}`);
			// // var house_titles = '';
			// for (let i = 0; i < res.titles.length; i++){
			// 	// house_titles += res.titles[i]
			// 	$('#titles').html(`${res.titles[i]}`);
			// }

			let name = "";
			name += "<h4> Name:</h4><p>"+res.name+"</p>";
			let words = "";
			words += "<h4> Words:</h4><p>"+res.words+"</p>";
			var titles = "";
			titles += "<h4>Titles:</h4>";
			titles += "<ul>";

			for(var x = 0; x < res.titles.length; x++)
			{
				titles += "<li>" + res.titles[x] + "</li>";
			}
			titles += "</ul>";
			

			$('#info').html(name + words + titles);

		}, 'json');
	});
})
