function Ninja(name, health, speed, strength) {
	const self = this;
	const privateVariable = "This variable is private";
    const privateMethod = function() {
    	console.log("this is private for " + self.health +" "+ self.strength);
        
    }
	this.name = name;
	this.health = 100;
	this.speed = 3;
	this.strength = 3;
	this.sayname = function(){
		console.log(this.name);
	}
	this.showStats = function() {
		console.log(`speed: {speed}`);
		console.log(`strength: {strength}`);
		console.log(`health: {this.health`);
	}
	this.drinksake = function(){
		this.health +=10;
		console.log(this.health);
		
		privateMethod();
	}
	this.punch = function(ninja) {
		if (ninja instanceof Ninja){
			this.health-=5;
			console.log(`${ninja.name} was punched by ${this.name} and lost 5 health`)
			console.log(this.health)
			return this
		}
		else{
			return "something fucked up"
		}
	}
	this.kick = function(ninja){
		if (ninja instanceof Ninja){
			let kicking = this.strength * 15;
			this.health -= kicking;
			console.log(`${ninja.name} was kicked by ${this.name} and lost ${kicking} health`)
			console.log(this.health)
		}
		else{
			return "something fuked up again"
		}
	}
}
	const cole = new Ninja("cole");
	
	const blueNinja = new Ninja("Goemon");
    const redNinja = new Ninja("Bill Gates");
    
    redNinja.punch(blueNinja);
    blueNinja.kick(redNinja);
    
