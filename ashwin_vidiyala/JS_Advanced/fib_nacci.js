function fib() {
  let fib1 = 0;
  let fib2 = 1

  function nacci() {
    console.log(fib2);
    
    fib2 = fib1 + fib2;
    fib1 = fib2 - fib1;
  }
  return nacci;
}

var fibCounter = fib();

fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
