// Objects basics and OOP in one place (junior-friendly).
// Run with: node data-structures/objects-basics.js

// ----- Basics: creating, reading, updating -----
// object literal syntax
const person = {
  name: "Stoyan",
  age: 29,
  describe() {
    return this.name + " is " + this.age;
  },
};
console.log("object describe():", person.describe());

// Add or update properties any time
person.hobby = "guitar";
console.log("person with hobby:", person.hobby);

// ----- Bracket notation and computed properties -----
// Use [] when the key is dynamic (in a variable) or not a valid identifier.
const dynamicKey = "favoriteColor";
const profile = { name: "Sam", [dynamicKey]: "blue" }; // computed property built from a variable
console.log("profile favoriteColor via dynamic key:", profile[dynamicKey]);
// Changing dynamicKey later won't rename the existing property; it was computed at creation time.
const newKey = "hobby";
profile[newKey] = "guitar"; // add another computed property after creation
console.log("profile hobby via new key:", profile[newKey]);
// Real-world: build keys from user input or config
const fieldNameFromForm = "email";
const userInput = "sam@example.com";
const userProfile = {};
userProfile[fieldNameFromForm] = userInput; // set property based on dynamic field name
console.log("userProfile with dynamic field:", userProfile);

// ----- References vs copies -----
// Objects are references: copying a reference points to the same object.
const samePersonRef = person;
samePersonRef.age = 30; // changes person too, because both names point to one object
console.log("person after ref change:", person.age);

// Shallow copy to avoid shared reference (copies top level only)
const personCopy = { ...person }; // spread syntax for shallow copy
// Alternative shallow copy: Object.assign({}, person)
personCopy.name = "Jordan";
console.log(
  "person original name:",
  person.name,
  "| personCopy name:",
  personCopy.name
);

// Deep copy options (when nested data):
// - structuredClone(obj) (modern browsers/Node 17+) copies nested data (but not functions)
// - JSON.parse(JSON.stringify(obj)) deep copies plain data, but loses functions, Dates, undefined
// Avoid mutating shared objects; prefer copies when you need immutability.
// To prevent edits, you can freeze: Object.freeze(obj) (shallow).

// ----- Nested objects -----
const company = {
  name: "Tech Co",
  address: {
    city: "NYC",
    zip: "10001",
  },
  // Method using this to read sibling properties
  fullAddress() {
    return this.name + " in " + this.address.city;
  },
};
console.log("company city:", company.address.city);
console.log("company fullAddress():", company.fullAddress());

// ----- Prototype-based inheritance (object literals) -----
// Inheritance: reuse a base shape for specialized objects.
const baseAnimal = {
  speak() {
    return "generic sound";
  },
};
const dog = Object.create(baseAnimal); // dog inherits speak from baseAnimal
dog.kind = "Dog";
dog.speak = function () {
  return this.kind + " says woof"; // overrides speak (polymorphism: same method name, different behavior)
};
const cat = Object.create(baseAnimal);
cat.kind = "Cat";
cat.speak = function () {
  return this.kind + " says meow"; // another override
};
console.log("dog speak:", dog.speak());
console.log("cat speak:", cat.speak());
console.log(
  "dog prototype is baseAnimal?",
  Object.getPrototypeOf(dog) === baseAnimal
);

// Polymorphism: calling the same method name on different objects behaves differently.
function makeItSpeak(animal) {
  console.log("speak:", animal.speak());
}
makeItSpeak(dog);
makeItSpeak(cat);

// Abstraction (pattern): expose only needed methods; hide internal details.
function createCounter() {
  let count = 0; // private inside closure
  return {
    increment() {
      count++;
    },
    getValue() {
      return count;
    },
  };
}
const counter = createCounter();
counter.increment();
counter.increment();
console.log(
  "abstracted counter value (no direct access to count):",
  counter.getValue()
);

// ----- Class-based inheritance (extends) -----
// Class syntax sets up prototypes under the hood; extends inherits from a parent class.
class Animal {
  constructor(kind) {
    this.kind = kind;
  }
  speak() {
    return this.kind + " makes a sound";
  }
}

class Dog extends Animal {
  constructor(name, age) {
    super("Dog"); // call parent constructor to set kind (Animal expects a kind string)
    this.name = name; // Dog can accept its own extra params (e.g., age, breed, etc.)
    this.age = age;
  }
  speak() {
    // override; polymorphism: same method name, different behavior
    return this.name + " says woof";
  }
  get info() {
    return this.name + " the " + this.kind + " age " + this.age; // getter example
  }
  static sound() {
    return "woof!"; // static method lives on the class, not on instances
  }
}

const spot = new Dog("Spot", 4);
console.log("class dog speak:", spot.speak());
console.log("class dog kind (inherited):", spot.kind);
console.log("class dog info getter:", spot.info); // uses getter
console.log("class Dog static sound:", Dog.sound()); // static method on the class, not instances

// Call parent method from override with super
class LoudDog extends Dog {
  // If you don't declare a constructor here, JS auto-creates one that does:
  // constructor(...args) { super(...args); }
  speak() {
    return super.speak().toUpperCase(); // use parent speak then modify
  }
}
const rex = new LoudDog("Rex", 2);
console.log("loud dog speak (using super):", rex.speak());

// If you need your own constructor in the subclass, you must call super with the args the parent expects.
class VeryLoudDog extends Dog {
  constructor(name, age) {
    super(name, age); // Dog expects (name, age)
  }
  speak() {
    return super.speak().toUpperCase() + "!!!";
  }
}
const boss = new VeryLoudDog("Boss", 3);
console.log("very loud dog speak:", boss.speak());

// Composition (has-a): combine objects instead of always extending.
// Meaning: one object holds another and delegates to it, instead of inheriting from it.
// Example: a car has-an engine (composition) vs a car is-an engine (inheritance, which doesn't fit).
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
console.log("car start (composition example):", car.start());

// Encapsulation with private fields (#) and setters/getters
class Account {
  #balance = 0; // private field, not accessible outside
  constructor(owner) {
    this.owner = owner;
  }
  deposit(amount) {
    if (amount <= 0) return "amount must be positive";
    this.#balance += amount;
    return "new balance: " + this.#balance;
  }
  get balance() {
    return this.#balance; // read-only view
  }
  set balance(value) {
    // setter example; usually you wouldn't set balance directly, but this shows the pattern
    if (value < 0) {
      console.log("balance cannot be negative");
      return;
    }
    this.#balance = value;
  }
}
const acct = new Account("Pat");
console.log(acct.deposit(50));
console.log("account balance via getter:", acct.balance);
acct.balance = -10; // blocked by setter
console.log("account balance after bad set attempt:", acct.balance);
