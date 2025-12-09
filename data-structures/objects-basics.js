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

// For class-based OOP (extends, super, static, private fields), see:
// functions-oop/constructors-and-classes.js
