$(document).ready(function(){
	let socket = io.connect();
	let username = prompt("Enter Your Nickname: ");
	socket.emit("enter_new_chatter", username);
	$("form").submit((a)=>{
		a.preventDefault();
		let formdata = $("form").serializeArray();
		console.log(formdata);
		socket.emit("new_letter", formdata);
	});
	socket.on("new_chatter", (data)=>{
		$("#chatbox").append("<p>"+data+" has joined your the channel</p>");
	});
	socket.on("good_letter", (data)=>{
		$("#chatbox").append("<p>"+data.name+": "+data.letter+"</p>");
	});
	socket.on("message_error", (data)=>{
		$("#chatbox").append("<p>"+data.error+"</p>");
	});
	socket.on("welcome", (data)=>{
		$("#chatbox").append("<p>Welcome "+data+" to the channel</p>");
	});
});