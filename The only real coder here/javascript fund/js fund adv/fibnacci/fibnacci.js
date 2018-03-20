function fib(){
	let list=[0,1];
	function nacci(){
		let num = list[list.length - 2] + list[list.length - 1];
		list.push(num);
		console.log(list[list.length-1]);
	}
	return nacci;
}
var fibcount = fib();
fibcount();
fibcount();
fibcount();
fibcount();
fibcount();
fibcount();