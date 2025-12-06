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
