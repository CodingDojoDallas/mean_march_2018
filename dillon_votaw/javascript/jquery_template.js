$(document).ready(function(){


function $Dojo(id){

  class Object{
    constructor(id){
      this.id = id;
    }
    click(callback){

    }
    hover(callbackIn, callbackOut){

    }

  }

let output = new Object(id);
return output;

}





$Dojo("clickButton").click(function() { console.log("The button was clicked!") });
$Dojo("hoverButton").hover(function() { console.log("The button was hovered on!"), console.log("The hover was broken!") });

})
