class Bike {
  constructor(
    public price:     number,
    public max_speed: number,
    public miles: number = 0
  ) { }

  displayInfo() {
    console.log(`
    Price: $${this.price}
    Maximum Speed: ${this.max_speed}mph
    Total Miles: ${this.miles}`
    );
    return this;
  };

  ride() {
    console.log('Riding...');
    this.miles += 10;
    return this;
  }

  reverse() {
    if (this.miles <= 5) {
        console.log(`Can't reverse when miles are ${this.miles}`);
        return this;
    } else {
        console.log('Reversing...');
        this.miles -= 5;
        return this;
    }
  }
}

bike1 = new Bike(100, 500);
bike2 = new Bike(200, 750);
bike3 = new Bike(300, 950);
bike1.ride().ride().ride().reverse().displayInfo();
bike2.ride().ride().reverse().reverse().displayInfo();
bike3.reverse().reverse().reverse().displayInfo();
