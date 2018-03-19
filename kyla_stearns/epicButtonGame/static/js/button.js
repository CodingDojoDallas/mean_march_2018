$(document).ready(() => {
	// this triggers the connection event in our server
	let socket = io.connect();
	// we'll write all the socket stuff after this line
	$('#amazing').click(() => {
		// alert('Handler for .submit() called.');
		socket.emit('sending_counter');
	});

	$('#reset').click(() => {
		// alert('Handler for .submit() called.');
		socket.emit('resetting_counter');
	});

	socket.on('respond_with_increment', (increment) => {
		var display_count = `<h1> You have pushed me ${increment} time(s) man, that's enough! </h1>`
		console.log(increment);
		$('#button_count').html(display_count);
	});	
	socket.on('respond_with_reset', (reset) => {
		var new_count = `<h1> You have pushed me ${reset} time(s) man, that's enough! </h1>`
		console.log(reset);
		$('#button_count').html(new_count);
	});	
})