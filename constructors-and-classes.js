// Constructor function (old-school class): use with new to make similar objects
// A function meant to be called with new; sets up properties on each created object.
function User(name) {
  this.name = name;
  this.greet = function () {
    return "Hi, I'm " + this.name;
  };
}
const userFromConstructor = new User("Casey");
console.log("constructor greet():", userFromConstructor.greet());

// Class syntax (modern wrapper over constructor functions)
// A blueprint: call with new to get an instance that gets its own this values.
class Animal {
  constructor(kind) {
    this.kind = kind;
  }
  speak() {
    return this.kind + " makes a sound";
  }
}
const dog = new Animal("Dog");
console.log("class speak():", dog.speak());

// Object literal: creates one specific object immediately (no new keyword needed).
// Use a regular function (method shorthand) so this points at the object when called.
// if arrow method is used here, this would not point to person object and will point to the outer scope global undefined.
const person = {
  name: "Stoyan",
  age: 29,
  greet() {
    console.log("Hi, I am " + this.name);
  },
};
person.greet();

console.log("person object:", person);
person.greet();

// ----- Inheritance (extends + super) -----
// Inheritance = build a more specific class from a general one.
// Dog inherits from Animal, reuses speak, and overrides it.
class Dog extends Animal {
  constructor(name) {
    super("Dog"); // call the parent (Animal) constructor
    this.name = name;
  }
  speak() {
    return this.name + " says: woof! (kind: " + this.kind + ")";
  }
}
const rex = new Dog("Rex");
console.log("dog speak():", rex.speak());

// Method overriding: if a subclass defines the same method name,
// the subclass version runs. You can still call super.method() if needed.

// ----- Getters, Setters, and Encapsulation -----
// Private fields (#) are hidden from outside; use methods/getters/setters to access.
class BankAccount {
  #balance = 0; // private field (not directly accessible from outside)
  constructor(owner) {
    this.owner = owner;
  }
  deposit(amount) {
    if (amount <= 0) return "amount must be positive";
    this.#balance += amount;
    return "new balance: " + this.#balance;
  }
  get balance() {
    return this.#balance; // getter exposes read-only view
  }
  set balance(value) {
    // setter example (not typical for bank balance, but shows the pattern)
    if (value < 0) {
      console.log("balance cannot be negative");
      return;
    }
    this.#balance = value;
  }
}
const account = new BankAccount("Pat");
console.log(account.deposit(50));
console.log("balance via getter:", account.balance);
account.balance = -10; // setter blocks invalid value
console.log("balance after bad set attempt:", account.balance);

// ----- Static methods -----
// Static methods belong to the class, not to instances. Use them for utilities.
class MathHelper {
  static add(a, b) {
    return a + b;
  }
}
console.log("MathHelper.add(2, 3):", MathHelper.add(2, 3));

// ----- "Abstract-ish" base class (pattern) -----
// JavaScript has no built-in abstract classes, but you can define a base
// class with methods meant to be overridden and throw if not implemented.
class Shape {
  area() {
    throw new Error("area() must be implemented by subclass");
  }
}
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}
const rect = new Rectangle(3, 4);
console.log("rectangle area:", rect.area());

// ----- Composition (has-a) vs Inheritance (is-a) -----
// Composition means an object holds another object to reuse behavior/data.
const engine = {
  hp: 200,
  start() {
    return "engine started with " + this.hp + " hp";
  },
};
const car = {
  make: "Toyota",
  engine, // car has-an engine
  start() {
    return this.make + ": " + this.engine.start();
  },
};
console.log("car start():", car.start());
