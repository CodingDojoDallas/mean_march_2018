$(document).ready(() => {
	let socket = io.connect();

	$('#increase_count').click((e) => {
		e.preventDefault();

		socket.emit('sending_counter');
	});
	$('#reset_count').click((e) => {
		e.preventDefault();

		socket.emit('sending_reset_counter');
	});

	socket.on('increase_click_count', (data) => {
		console.log(data.response);
		$('#clicks').html(data.response);
	});


	socket.on('reset_click_count', (data) => {
		console.log(data.response);
		$('#clicks').html(data.response);
	});
});