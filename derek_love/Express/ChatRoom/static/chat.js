$(document).ready(() => {
	let socket = io.connect();

	// prompt user to enter their name
	let userName = prompt('Enter your username');

	// send the inputted name to the server
	socket.emit('sending_new_user_data', userName);


	// listen for user info from the server
	socket.on('added_new_user', (data) => {

		// append userName to other users' chatBoard 
		$('#chatBoard').append(`<p>${data} entered the chat room</p>`);
	});

	// listen for all previous comments from server
	socket.on('show_all_comments', (data) => {

		// iterate through all comments
		for(let i = 0; i < data.length; i++){

			// append each comment to current user's chatBoards
			$('#chatBoard').append(`<p>${data[i].user_name}: ${data[i].comment}</p>`)
		}
	});

	// submit comment to be added to chatBoard
	$('#add_message').submit((e) => {
        e.preventDefault();

        // put comment into an array
        let formData = $('#add_message').serializeArray();
       
        // send formData to server
		socket.emit('sent_comment', formData )

    });

    // listen for comment info from server
    socket.on('response_comment', (user_info) => {

    	// append comment and user who posted to all users' chatBoards
        $('#chatBoard').append(`<p>${user_info.user_name}: ${user_info.comment}</p>`);
    });
});