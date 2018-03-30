class ninja{
	constructor(name, health, speed, strength){
		this.name=name;
		this.health=100;
		this.speed=3;
		this.strength=3;
	}
	sayname(){
		console.log(this.name);
	}
	showstats(){
		console.log(`speed: ${this.speed}`);
		console.log(`strength: ${this.strength}`);
		console.log(`health: ${this.health}`);
	}
	drinksake(){
		this.health +=10;
		console.log(this.health);
	}
}
class Sensei extends ninja{
	constructor(name, health, speed, strength, wisdom){
	super(name, speed, strength);
	this.health=200;
	this.wisdom = 10;
	}
	speakwisdom(){
		const wise = super.drinksake();
		
		console.log("be wise about your bugs, and run the code often")
		console.log(wise);
		
	}
	showStats(){
		const stats = super.showstats();
		const say = super.sayname();
		console.log(say && stats);
		
	}

}
const redninja= new ninja("red");
redninja.sayname();
redninja.showstats();
redninja.drinksake();
const supersensei= new Sensei("splinter")
supersensei.speakwisdom();
supersensei.showStats();