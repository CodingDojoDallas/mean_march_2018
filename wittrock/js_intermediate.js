function starString(num) {
	str=""
	for (var i = 0; i < num; i++) {
		str+= "*"
	}
	console.log(str)
}

function drawstars(arr) {
	string=""
	for (var i = 0; i < arr.length; i++) {
		string=things(arr[i])
		
	}
	return string
}

function things(val) {
	
	for (var i = 0; i < val; i++) {
		let str=""
		if (val[i].constructor === Number) {
			console.log("*")
		}
		
		else if (val[i].constructor === String) {
			for (var x = 0; x < val.length; x++) {
				str += x[0];
				console.log(str)
			}	
		}
	}
	
}
