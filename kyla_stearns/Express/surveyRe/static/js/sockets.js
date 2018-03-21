$(document).ready(() => {
	// this triggers the connection event in our server
	let socket = io.connect();
	// we'll write all the socket stuff after this line

	$('#survey_form').submit((event) => {
		// alert('Handler for .submit() called.');
		event.preventDefault();
		// return false;

		// go get all the data from the form and pass it along
		let surveyData = $('#survey_form').serializeArray();

		// Matt suggested trying not to use the .serialize function but I was super confused -->
		// b/c when I console logged surveyData it was undefined :-/

		// let surveyData = {
		// 	name: $('#name').val(),
		// 	location: $('#location').val(),
		// 	language: $('#language').val(),
		// 	comment: $('#comment').val()
		// }
		socket.emit('posting_form_data', surveyData);
		console.log(surveyData);
	});

	socket.on('respond_with_data', (surveyData) => {
		console.log(surveyData[0]);
		console.log("I received some data");

		let data = `<p>You emitted the following information to the server:</p>
					<p>{ ${surveyData[0].name} : '${surveyData[0].value}' , 
					${surveyData[1].name} : '${surveyData[1].value}' , 
					${surveyData[2].name} : '${surveyData[2].value}' , 
					${surveyData[3].name} : '${surveyData[3].value}' }</p>`;

		// THIS RETURNS OBJECTS, NOT THE ACTUAL ARRAY AS PICTURED IN THE CONSOLE OR SERVER
		// let data = `<p>You emitted the following information to the server:</p>
		// 			<p> ${ surveyData } </p>`;

		socket.on('send_random_number', (random_number) => {
			var rando = random_number;
			var fun_number = `<p> Your lucky number emitted by the server is: ${rando} </p>`
			console.log(rando);

			$('#displayData').append(data, fun_number);
		});	
	});
})