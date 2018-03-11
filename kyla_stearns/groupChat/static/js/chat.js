$(document). ready(function (){
  var socket  = io.connect();

  var input_name = prompt("Local host says: what is your name?", "write your name here!");
  if (confirm("Hello " + input_name +"! Click OK")) {
  // session.name = input_name;
    console.log(input_name);
    $('#user_name').append("<h3> Welcome " + input_name + "</h3>");

  } 
  else {
    txt = "You pressed Cancel!";
    console.log(txt);
  }

  $('#message').submit(function (){
    console.log($(this).serializeArray());
    var message = $(this).serializeArray()[0].value;
    var name = input_name;
    console.log(message, input_name);
    socket.emit("message_posted", {message: message, name: name});

    return false;
  });

  socket.on('server_response', function (data){
    console.log("username & message", data);
    $('#board').append("<p><span>" + data.name + " says: </span> " +  data.message + "</p>");
  });

})