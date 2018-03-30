$(document).ready(function(){
// used below loop to find the id numbers for the four houses
// is there a better way to do this?? idk
// for(i=0;i<400;i++){
//   $.get("https://www.anapioficeandfire.com/api/houses/"+i+"/", function(res) {
//       console.log(res);
//   }, "json");
// }

$('img').click(function(){
	var id = $(this).attr('id');
	$.get("https://www.anapioficeandfire.com/api/houses/" + id + "/", function(data) {
    var html_str = "";
    html_str += "<h3>Name: "+data.name+"</h3>"
    html_str += "<h3>Words: "+data.words+"</h3>"
    html_str += "<h3><u>Titles</u></h3>"
    for(var i=0;i<data.titles.length;i++){
        html_str+="<h3>"+data.titles[i]+"</h3>"
    }

    $('#info').html(html_str);
	}, "json");

})
})
