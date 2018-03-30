$(document).ready(function(){


$('#myButton').click(getData)

function getData(){
  $.get("https://api.github.com/users/68debord", displayName);
  console.log('testing');
}
  // Notice that displayName is a function that takes in 1 parameter (this is the data that comes back from the API)
function displayName(data) {
    console.log(data);
    $('#container').html(data.login);
}

})
