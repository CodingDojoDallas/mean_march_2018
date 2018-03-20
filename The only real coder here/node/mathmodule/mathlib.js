module.exports = function(){
	return {
		add: function(a,b){
			console.log("Sum: ",a + b);
		},
		multiply: function(a,b){
			console.log(a*b);
		},
		square: function(a){
			console.log(a*a);
		},
		random: function(a,b){
			console.log(Math.floor(Math.random()*b)+a);
		}
	}
}