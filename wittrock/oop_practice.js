function personConstructor(name, age) {
    // an object literal that will be returned
    this.name = name;
    this.age = age;
    
    this.greet=function(){
        console.log("Hello my name is " + this.name + " and I am " + this.age + " years old!")
    }
}
// create the 'steve' instance, run greet
const steve = new personConstructor("Steve", 27);
steve.greet();
// create the 'anika' instance, run greet. note that it is different.
const anika = new personConstructor("Anika", 33);
anika.greet();
// finally note how we can refine the greet method for any particular instance
const emily = new personConstructor("Emily", 22);
emily.greet = function() {
    console.log("I am the greatest, ever!"+this.name);
}
emily.greet();
