$(document).ready(function(){
	let socket = io.connect();
	$("form").click((a)=>{
		a.preventDefault();
		socket.emit("button_clicked");
	});
	$("#button").click((a)=>{
		a.preventDefault();
		socket.emit("reset");
	});
	socket.on("inc", (data)=>{
		$("#counter").html("<p>The button has been pushed "+data+" time(s).")
	});
	socket.on("set", (data)=>{
		$("#counter").html("<p>The button has been reset to "+data+".</p>")
	});
});