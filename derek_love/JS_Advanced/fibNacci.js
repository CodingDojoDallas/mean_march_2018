function fib() {

	var list = [0,1];
	
	function nacci() {
		num = list[list.length - 1] + list[list.length - 2];
		list.push(num);
		console.log(list[list.length -1]);
	}
	return nacci;
}
var fibCounter = fib();

fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
