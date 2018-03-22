// 1. Setting Types
var myString: string;
// I can assign myString like this:
myString = "Bee stinger";
// Why is there a problem with this? What can I do to fix this?
myString = 'Another String';

// 2. Setting the types for function parameters
function sayHello(name: string){
   return `Hello, ${name}!`;
}
// This is working great:
console.log(sayHello("Kermit"));
// Why isn't this working? I want it to return "Hello, 9!"
console.log(sayHello('9'));

// 3. Optional Parametesr
function fullName(firstName: string, lastName: string, middleName?: string){
   let fullName = `${firstName} ${middleName} ${lastName}`;
   return fullName;
}
// This works:
console.log(fullName("Mary", "Moore", "Tyler"));
// What do I do if someone doesn't have a middle name?
console.log(fullName("Jimbo", "Jones"));

// 4. Interfaces and Function Paramters
interface Student {
   firstName: string;
   lastName: string;
   belts: number;
}
function graduate(ninja: Student){
   return `Congratulations, ${ninja.firstName} ${ninja.lastName}, you earned ${ninja.belts} belts!`;
}
const christine = {
   firstName: "Christine",
   lastName: "Yang",
   belts: 2
}
const jay = {
   firstName: "Jay",
   lastName: "Patel",
   belts: 4
}
// This seems to work fine:
console.log(graduate(christine));
// This one has problems:
console.log(graduate(jay));

// 5. Classes and Function Parameters
class Ninja {
   fullName: string;
   constructor(
      public firstName: string,
      public lastName: string) {
         this.fullName = `${firstName} ${lastName}`;
      }
   debug(){
      console.log("Console.log() is my friend.")
   }
}
// This is not making an instance of Ninja, for some reason:
const shane = new Ninja('Matt', 'Tucker');
// Since I'm having trouble making an instance of Ninja, I decided to do this:
const turing = {
   fullName: "Alan Turing",
   firstName: "Alan",
   lastName: "Turing"
}
// Now I'll make a study function, which is a lot like our graduate function from above:
function study(programmer: turing){
   return `Ready to whiteboard an algorithm, ${programmer.fullName}?`
}
// Now this has problems:
console.log(study(turing));

// 6. Arrow Functions
var increment = x => x + 1;
// This works great:
console.log(increment(3));
var square = x => x * x;
// This is not showing me what I want:
console.log(square(4));
// This is not working:
var multiply = (x, y) => x * y;
console.log(multiply(3, 6));
// Nor is this working:
var math = ((x, y) => {
    let sum = x + y;
    let product = x * y;
    let difference = Math.abs(x-y);
    return [sum, product, difference];
})
console.log(math(2, 3));

// 7. Arrow functions and 'this'
class Elephant {
   constructor(public age: number){}
   birthday() {
      this.age++;
   }
}
const babar = new Elephant(8);
setTimeout(babar.birthday(), 1000)
setTimeout(function(){
   console.log(`Babar's age is ${babar.age}.`)
   }, 20)
