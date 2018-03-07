function ninja(name, health, speed, strength) {
	const self = this;
	const privateVariable = "This variable is private";
    const privateMethod = function() {
    	console.log("this is private for " + self.health +" "+ self.strength);
        console.log(self);
    }
	this.name = name;
	this.health = health;
	this.speed = speed;
	this.strength = strength;
	this.sayname = function(){
		console.log(this.name);
	}
	this.showStats = function() {
		console.log("name: " + this.name + " health: " + this.health + " speed: " + this.speed + " strength: " + this.strength);
	}
	this.drinksake = function(){
		this.health +=10;
		console.log(this.health);
		console.log(privateVariable);
		privateMethod();
	}
}
	const cole = new ninja("cole", 3, 100, 3);
	cole.sayname();
	cole.showStats();
	cole.drinksake();
	
// name
// health
// speed(private)
// strength(private)

// sayname()
// showstats()
// drinksake()