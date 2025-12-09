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
// Note on prototypes (how JS finds methods):
// - Functions have a prototype object; instances created with new link to it.
// - Methods on the prototype are shared by all instances (one function in memory).
// - Lookup flow when calling shared.greet():
//   1) Check shared itself for greet (own property). If not there...
//   2) Check SharedUser.prototype for greet. Found? Use it.
//   3) If not, keep walking up the chain (e.g., Object.prototype) until found or null.
// - Prototype is like a shared toolbox that instances can fall back to.
function SharedUser(name) {
  this.name = name;
}
SharedUser.prototype.greet = function () {
  return "Hi, I'm " + this.name;
};
const shared = new SharedUser("Taylor");
console.log("prototype method greet():", shared.greet());

// Class syntax (modern wrapper over constructor functions)
// A blueprint: call with new to get an instance that gets its own this values.
// Modern class syntax sets up prototypes under the hood (same prototype chain as constructor+prototype).
// For constructor functions, the function itself is not the prototype; the function's .prototype
// object is the shared prototype that instances link to.
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
  nickname = "buddy"; // public field with a default value per instance
  constructor(name = "Unknown", age = 0) {
    super("Dog"); // call the parent (Animal) constructor
    this.name = name; // defaults kick in if caller omits args
    this.age = age;
  }
  speak() {
    return (
      this.name + " says: woof! (kind: " + this.kind + "), age " + this.age
    );
  }
}
const rex = new Dog("Rex", 4);
console.log("dog speak():", rex.speak());
console.log("dog nickname default:", rex.nickname);

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
    // # makes the field private (only code inside this class can use it).
    // You must use # to access a private field from within the class.
    // The getter returns its value so outside code can read it, but cannot write it directly.
    return this.#balance;
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

// ----- Polymorphism: same method name, different behavior -----
class Cat extends Animal {
  constructor(name) {
    super("Cat");
    this.name = name;
  }
  speak() {
    return this.name + " says: meow (kind: " + this.kind + ")";
  }
}
const petTalk = (pet) => console.log("pet speaks:", pet.speak());
petTalk(rex);
petTalk(new Cat("Milo"));

// ----- super in overrides: reuse parent logic -----
class LoudDog extends Dog {
  speak() {
    return super.speak().toUpperCase(); // call parent speak, then change it
  }
}
console.log("loud dog:", new LoudDog("Boomer").speak());

// ----- Method chaining example -----
class Builder {
  constructor() {
    this.parts = [];
  }
  add(part) {
    this.parts.push(part);
    return this; // returning this lets you chain calls
  }
  build() {
    return this.parts.join("-");
  }
}
const built = new Builder().add("a").add("b").add("c").build();
console.log("chained build result:", built);

// ----- Mixin pattern (add shared behavior without inheritance) -----
// A mixin is a bag of methods you can copy into another object/class to add behavior.
// Use when: you want to reuse small behaviors without forcing an inheritance chain.
const canLog = {
  log(message) {
    console.log("log:", message);
  },
};
const canTimestamp = {
  timestamp() {
    return Date.now();
  },
};

// Create an object that mixes in both behaviors
const logger = Object.assign({}, canLog, canTimestamp); // copies methods into a new object
logger.log("hello mixin");
console.log("timestamp from mixin:", logger.timestamp());

// You can also apply mixins to a class prototype to give all instances the behavior:
function Reporter(name) {
  this.name = name;
}
Object.assign(Reporter.prototype, canLog, canTimestamp);
const rep = new Reporter("Sam");
rep.log("reporting"); // now Reporter instances can log and timestamp
console.log("reporter timestamp:", rep.timestamp());

// ----- this and methods -----
// this depends on HOW a function is called.
// When you pull a method off an instance and call it bare, this is lost (undefined in strict mode).
const looseSpeak = rex.speak; // just the function, no object before the dot
console.log("loose speak (this lost, likely undefined):", looseSpeak()); // this is not rex here
// Fix: bind the method to the instance so this stays rex.
const boundSpeak = rex.speak.bind(rex);
console.log("bound speak (this fixed):", boundSpeak());
// bind returns a new function that is permanently wired to use the provided this (rex).
// You can also bind partially applied arguments: func.bind(thisArg, arg1, arg2, ...)
// Think of bind as: lock the function to this object, and optionally pre-fill some args.
// Example of pre-filling args:
// function add(a, b) { return a + b; }
// const add5 = add.bind(null, 5); // bind(thisArg, ...preFilledArgs); first param is always the thisArg (null here because add doesn't use this keyword)
// console.log(add5(3)); // 8 (5 as first arg, 3 as second)
