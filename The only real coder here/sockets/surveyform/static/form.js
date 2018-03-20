$(document).ready(function(){
	let socket = io.connect();
	$("form").submit(function(a){
		a.preventDefault();
		let formdata = $("form").serializeArray();
		socket.emit("button_clicked", formdata);
	});
	socket.on("userinfo", (data) =>{
		console.log(data);
		var str = "";
		for (let i = 0; i < data.length; i++){
			str += (data[i].name+": "+data[i].value+". ");
		}
		$("#here").append("<p>The info you submitted: "+str+"</p>");
	});
	socket.on("randomnum", (random)=>{
		$("#here").append("<p>Your lucky number is: "+random+".</p>");
	});
});