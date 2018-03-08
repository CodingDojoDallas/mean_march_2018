var _ = {
	map: function(arr, callback) {
		var new_arr = [];
		for(var i = 0; i < arr.length; i++){
			new_arr.push(callback(arr[i]));
		}
		return new_arr;
	},

	reduce: function(arr, callback, memo) {
		var total = 0;
		for(var i = 0; i < arr.length; i++) {
			total += callback(memo,arr[i]);
		}
		return total;
	},

	find: function(arr, callback) {
		for(var i = 0; i < arr.length; i++) {
			if(callback(arr[i]) == true){
				return arr[i];
			}
		}
	},

	filter: function(arr, callback) {
		var new_arr = [];
		for(var i = 0; i < arr.length; i++) {
			if(callback(arr[i]) == true){
				new_arr.push(arr[i]);
			}
		}
		return new_arr;
	},

	reject: function(arr, callback) {
		var new_arr = [];
		for(var i = 0; i < arr.length; i++){
			if(callback(arr[i]) == false){
				new_arr.push(arr[i]);
			}
		}
		return new_arr;
	}
}

var map = _.map([1,2,3], function(num) { return num * 2; });
console.log(map);

var sum = _.reduce([1,2,3], function(memo, num) { return memo + num; }, 0);
console.log(sum);

var find = _.find([1,2,3,4], function(num) { return num % 2 == 0; });
console.log(find);

var filter = _.filter([1,2,3,4,5,6], function(num) { return num % 2 == 0; });
console.log(filter);

var reject = _.reject([1,2,3,4,5,6], function(num) { return num % 2 == 0; });
console.log(reject);
