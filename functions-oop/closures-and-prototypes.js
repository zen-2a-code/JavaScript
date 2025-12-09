// Closures and prototypes (junior-friendly)

// ----- Closures -----
// A closure is a function that remembers variables from its outer scope
// even after that outer function has finished.
function makeCounter() {
  let count = 0; // private to this factory
  return function () {
    count++; // still can access count because of closure
    return count;
  };
}

const counterA = makeCounter();
console.log("counterA:", counterA()); // 1
console.log("counterA:", counterA()); // 2

const counterB = makeCounter();
console.log("counterB:", counterB()); // 1 (separate closure and state)

// Closures are great for creating private state or configuration
function greetLater(name) {
  return function () {
    console.log("Hello,", name);
  };
}
const greetAlex = greetLater("Alex");
greetAlex(); // remembers "Alex"

// Closure capturing a value that is later changed
let color = "blue";
const describeColor = () => "Color is " + color;
console.log(describeColor()); // "blue"
color = "green"; // closure sees updated outer variable
console.log(describeColor()); // "green"

// Closure with a one-time initializer (common pattern)
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result;
  };
}
const init = once(() => "initialized");
console.log(init()); // runs fn
console.log(init()); // returns cached result

// ----- Prototypes (under the hood of objects/classes) -----
// Every object has an internal prototype link used for property lookups.
// You can share methods via prototypes to avoid duplicating functions on every instance.

// Old-school prototype pattern without class syntax
function Car(make) {
  this.make = make;
}
Car.prototype.honk = function () {
  return this.make + " says honk!";
};

const car1 = new Car("Toyota");
const car2 = new Car("Honda");
console.log("car1 honk:", car1.honk());
console.log("car2 honk:", car2.honk());

// Both car1 and car2 share the same honk function via Car.prototype
console.log("same honk function?", car1.honk === car2.honk); // true
console.log(
  "car1 prototype is Car.prototype?",
  Object.getPrototypeOf(car1) === Car.prototype
);

// Object.create lets you set a prototype manually
const animalProto = {
  speak() {
    return "generic sound";
  },
};
const cat = Object.create(animalProto);
cat.kind = "cat";
console.log("cat speak via prototype:", cat.speak());

// Prototype chain lookup: JS first checks own properties, then walks up the prototype chain.
const base = { baseProp: "base" };
const child = Object.create(base);
child.childProp = "child";
console.log("own prop:", child.childProp); // from child
console.log("inherited prop:", child.baseProp); // from base via prototype

// Modern class syntax sets up prototypes under the hood (class/extends sugar).
// See constructors-and-classes.js for class-based examples.
