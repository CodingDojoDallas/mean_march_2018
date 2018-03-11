$(document).ready(() => {
	// this triggers the connection event in our server

	// let socket = io.connect();
	var socket = io();
	// we'll write all the socket stuff after this line

	$('#user').submit(() => {
		// alert('Handler for .submit() called.');
		// event.preventDefault();

		// go get all the data from the form and pass it along
		// let userData = $('#user').serializeArray();

		socket.emit('user_joined');
		// console.log(userData);
	// });

	$('#chat_box').submit(() => {
		socket.emit('chat message', $('#message').val());
		$('#message').val('');
		console.log($('#message').val());
		return false;
	});

	socket.on('respond_with_user', () => {
	// 	console.log(userData[0]);
		console.log("We see you!");

	// 	let user = `<th> ${userData[0].value} </th>`;
	// 	$('#user_block').append(user);
	});
})