class User {
  //   name = "John Doe";

  //   age = 30;

  constructor(name, age) {
    this.name = name; // this refers to the current instance of the class
    this.age = age; // this refers to the current instance of the class
  }

  sayHello() {
    console.log(`hello ${this.name}`); // this refers to the current instance of the class
  }
}

const user1 = new User("John", "30"); // create an instance of the class
console.log(user1.name);

user1.sayHello();

const user2 = new User("nika", "20"); // create an instance of the class
user2.sayHello();

//////////////
///////////////
/////////////

class Animal {
  constructor(name) {
    this.name = name;
  }
  alive() {
    console.log(`aliveee`);
  }
}

class Bird extends Animal {}

const chiti = new Bird();
chiti.alive();

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call the parent class constructor with the name parameter
    this.breed = breed; // Assign the breed to the current instance
  }

  walk() {
    console.log(` is walking`); // this refers to the current instance of the class
  }

  alive() {
    console.log(` is alive`); // this refers to the current instance of the class
  }
}

const dog2 = new Dog("jeka2", "bulldog2");

class Fish {
  constructor(name, age) {
    this.name = name; // this refers to the current instance of the class
    this.age = age; // this refers to the current instance of the class
  }

  swim() {
    console.log(`${this.name} is swimming`);
  }

  alive() {
    console.log(`${this.name} is alive`);
  }
}

const dog1 = new Dog("jeka", "labrador");

const fish1 = new Fish("nemo", 2);

dog1.walk();
fish1.swim();

class Student {
  #grade = 0;
  constructor(name) {
    this.name = name; // this refers to the current instance of the class
  }

  exam1(num) {
    this.#grade += num;
  }

  exam2(num) {
    this.#grade += num;
  }

  getInfo() {
    console.log(`name: ${this.name}, grade: ${this.#grade}`);
  }
}

const student1 = new Student("John");

student1.exam1(30);
student1.exam2(20);

student1.getInfo();

//////////////////
//////////////
///////////////////////
/////////////////////////

class Calculator {
  #number = 0; // private property
  constructor(num) {
    this.#number = num;
  }

  add(num) {
    this.#number += num;
    return this;
  }

  sub(num) {
    this.#number -= num;
    return this;
  }

  multiply(num) {
    this.#number *= num;
    return this;
  }
  divide(num) {
    this.#number /= num;
    return this;
  }

  getValue() {
    console.log(this.#number);
  }

  get value() {
    return this.#number;
  }

  set value(num) {
    this.#number = num;
  }
}

const res = new Calculator(0);
res.add(3).multiply(5).sub(1).divide(2).getValue();

res.value = 10;
console.log(res.add(3).value);

///////////////////
//////////////////
//////////////////
//////////////////
//////////////////

class Vehicle {
  #startEngine() {
    console.log("engine starting...");
  }

  #rotateKey() {
    console.log("key rotating...");
  }

  start() {
    this.#startEngine();
    this.#rotateKey();
    console.log("Vehicle started.");
  }
}

class Car extends Vehicle {}

const car1 = new Car();
car1.start();

/////////////////
////////////////
///////////////
////////////////

class Shape {
  getArea(radius) {
    return radius * radius * Math.PI;
  }
}

class Circle extends Shape {}

const circle1 = new Circle(50);

circle1.getArea(4);

class Rectangle extends Shape {
  getArea(length, width) {
    return console.log(length * width);
  }
}

const rectangle1 = new Rectangle();

rectangle1.getArea(5, 10);

//////////////////
/////////////////
//////////////

class A {
  doSomething() {
    console.log("Doing something in class A");
  }
}

//! class B implements A {
// !  doSomething() {
// !    console.log("Doing something in class A");
// !  }
//! }

//create a Bank account class with methods deposit().
//widthDraw(), transferMoney(
//transactionHistory(), getBalance()

class BankAccount {
  #balance = 0;
  #history = [];

  #addTransactionHistory(operation, amount, accountNumber) {
    const interData = {
      operation: operation,
      amount: amount,

      date: new Date().toLocaleString(),
    };

    if (accountNumber) {
      interData.accountNumber = accountNumber;
    }

    this.#history.push(interData);
  }
  deposit(amount) {
    this.#balance += amount;
    this.#addTransactionHistory("DEPOSIT", amount);
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      console.log("Insufficient funds");

      return;
    }

    this.#balance -= amount;
    this.#addTransactionHistory("WITHDRAW", amount);
  }

  transferMoney(accountNumber, amount) {
    if (amount > this.#balance) {
      console.log("Insufficient funds");
      return;
    }

    this.#balance -= amount;
    this.#addTransactionHistory("TRANSFER", amount, accountNumber);
  }

  getTransactionHistory() {
    console.log("Transaction History:");
    this.#history.forEach((transaction) => {
      console.log(transaction);
    });
  }

  getBalance() {
    return this.#balance;
  }
}

const levanisBank = new BankAccount();
levanisBank.deposit(2000);
levanisBank.withdraw(1000);
levanisBank.transferMoney("01002023", 100);
levanisBank.withdraw(500);
levanisBank.getTransactionHistory();
