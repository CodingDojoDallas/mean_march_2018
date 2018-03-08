function rBinary(arr, num, i){
	if(arr[i] == num){
		return true;
	}
	else if(arr[i] != num && i == arr.length){
		return false;
	}
	else{
		return rBinary(arr, num, i+1);
	}
	
}

console.log(rBinary([1,2,3,4,5], 7, 0));