// Constructor function (old-school class): use with new to make similar objects
function User(name) {
  this.name = name;
  this.greet = function () {
    return "Hi, I'm " + this.name;
  };
}
const userFromConstructor = new User("Casey");
console.log("constructor greet():", userFromConstructor.greet());

// Class syntax (modern wrapper over constructor functions)
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
