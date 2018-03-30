module.exports = function () {
	return {
		add: function(num1, num2) {
			console.log(num1 + num2);
		},

		multiply: function(num1, num2) {
			console.log(num1 * num2);
		},

		square: function(num) {
			console.log(num * num);
		},

		random: function(num1, num2) {
			if (num1 > num2){
				console.log('first number must be less than second number!');
			}
			else{
				console.log(Math.floor((Math.random()* num2) + num1));
			}
		}
	}
};