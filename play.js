// Reference sheet for junior devs: variables, objects, functions (all flavors), this, hoisting, generators, IIFEs.

// ----- Variable declarations (scoping + hoisting) -----
// var -> function-scoped, hoisted (shows up as undefined before its line), can redeclare/reassign
var myName = "Stoyan";

// let -> block-scoped, NOT usable before its line (temporal dead zone), can reassign
let age = 29;

// const -> block-scoped, NOT usable before its line, cannot reassign (but objects inside can change)
const hasHobbies = true;

// No keyword -> creates/uses a global in non-strict mode (accidental globals are bugs, avoid this)
accidentalGlobalColor = "blue"; // <-- will end up on globalThis

// Hoisting demo: var is hoisted (shows undefined); let/const throw if accessed too early
console.log("hoistedVar before assign:", hoistedVar); // undefined, because var is hoisted
var hoistedVar = "set later";

try {
  console.log(beforeLet); // ReferenceError because let is NOT accessible before its line
  let beforeLet = "won't get here";
} catch (err) {
  console.log("beforeLet access failed (TDZ):", err.message);
}

// ----- Objects (data + behavior bundles) -----
// JavaScript objects: key-value pairs that can also hold functions (methods).
// Access with dot or bracket notation (user.name or user["name"]); add/replace anytime.
// Use objects to group related data and the functions that work on that data.
const person = {
  name: "Stoyan",
  age: 29,
  describe() {
    return this.name + " is " + this.age;
  },
};
console.log("object describe():", person.describe());

// Objects are references: copying a reference points to the same object
const samePersonRef = person;
samePersonRef.age = 30; // changes person too, because both names point to one object
console.log("person after ref change:", person.age);

// Add or update properties any time
person.hobby = "guitar";
console.log("person with hobby:", person.hobby);

// Shallow clone to avoid shared reference (copies top level only)
const personCopy = { ...person };
personCopy.name = "Jordan";
console.log("person original name:", person.name, "| personCopy name:", personCopy.name);

// Nested object example and access
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

// ----- Function styles with use cases -----
// Regular named function declaration: hoisted, good for helpers you call anywhere
function summarizeUser(username, userAge, userHasHobby) {
  return (
    "Name is " +
    username +
    ", age is " +
    userAge +
    " and user has hobbies " +
    userHasHobby
  );
}

console.log(summarizeUser(myName, age, hasHobbies));

// Anonymous arrow function stored in a const: common for quick, one-off helpers.
// It has no name by itself; you use the variable name to call it.
const summarizeUserArrow = (username, userAge, userHasHobby) => {
  return (
    "Arrow summary -> Name: " +
    username +
    ", age: " +
    userAge +
    ", hobbies: " +
    userHasHobby
  );
};
console.log(summarizeUserArrow(myName, age, hasHobbies));

// Function expression stored in a variable: define when you need it, keeps code near its usage
const add = function (a, b) {
  return a + b;
};
console.log("add(2, 3):", add(2, 3));

// Named function expression: name shows up in stack traces, helpful for debugging
const divide = function divideSafely(a, b) {
  if (b === 0) return "no dividing by zero";
  return a / b;
};
console.log("divideSafely(10, 2):", divide(10, 2));

// Arrow function: short syntax, keeps outer this, perfect for callbacks/inline logic
const multiply = (a, b) => a * b;
console.log("multiply(4, 5):", multiply(4, 5));

// Arrow function with implicit return: tiny helpers
const square = (n) => n * n;
console.log("square(6):", square(6));

// Inline anonymous function passed directly as a callback (not saved to a variable)
[1, 2, 3].forEach(function (num) {
  console.log("inline callback hit:", num);
});

// Immediately Invoked Function Expression (IIFE): run setup code once right away
// Use case: create a tiny private scope so setup variables don't leak into the rest of the file.
(function () {
  const setupMessage = "IIFE ran right away and cleaned up after itself";
  console.log(setupMessage);
})();

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

// Async function: returns a Promise, lets you write async code that looks sync
async function fetchFakeData() {
  return "pretend data";
}
fetchFakeData().then((data) => console.log("async function result:", data));

// Generator function: can pause/resume with yield, great when you want values one-at-a-time
// instead of building a big array (saves memory, can model endless streams).
function* countUpTo(max) {
  let current = 1;
  while (current <= max) {
    // yield hands back one value and remembers where it stopped,
    // so the next .next() call continues from here instead of restarting
    yield current;
    current++;
  }
}
const counter = countUpTo(3);
console.log(
  "generator values pulled one by one:",
  counter.next().value,
  counter.next().value,
  counter.next().value
);
// You can also loop through a generator to get values on demand
for (const num of countUpTo(2)) {
  console.log("generator via loop:", num);
}

// Generator use case example: produce a long list lazily (no big array stored in memory)
function* streamIds() {
  let id = 1;
  while (true) {
    yield id++; // each call to next() gives the next id without keeping a big list
  }
}
const idStream = streamIds();
console.log("next id:", idStream.next().value);
console.log("next id:", idStream.next().value);
console.log("next id:", idStream.next().value);

// ----- this keyword examples -----
// this = "who is calling the function" (the execution context)
// - In methods, this is the object before the dot.
// - In arrow functions, this is NOT rebound; it comes from the outer scope.
// - In loose functions (not methods), this can be global (or undefined in strict mode).
const user = {
  firstName: "Alex",
  // Regular method: this points to the object when called as user.describe()
  describe() {
    return "User is " + this.firstName;
  },
  // Arrow method: does NOT have its own this; it uses outer this (here likely global)
  describeArrow: () => "Arrow this first is " + (this.firstName || "undefined"),
};
console.log("describe():", user.describe());
console.log("describeArrow():", user.describeArrow());

// this with callbacks:
// - Arrow functions do NOT get their own this; they reuse the this from the surrounding scope.
// - Here the surrounding scope is bumpLater, so this stays as counterObj and can reach its properties (value) and methods.
// - The curly braces of bumpLater are just the function body; they do NOT create a new object.
//   We still use this to talk to the counterObj defined outside (where 'value' lives).
const counterObj = {
  value: 0,
  bumpLater() {
    setTimeout(() => {
      // Arrow keeps this pointing to counterObj
      this.value++;
      console.log("counterObj value after timeout:", this.value);
    }, 0);
  },
};
counterObj.bumpLater();

// What if we used a regular function? this would be undefined (in strict mode)
// because setTimeout later calls the callback as a plain function: timeoutCallback().
// There is no object before the dot at call time, so there is no object receiver to bind this.
const counterObjBroken = {
  value: 0,
  bumpLater() {
    setTimeout(function () {
      // Regular functions get their this from how they are called.
      // setTimeout calls this callback as timeoutCallback(), with no object before the dot,
      // so here this is undefined (strict mode) or the global object (non-strict).
      // That means we are NOT pointing at counterObjBroken.
      console.log("regular function this is:", this);
    }, 0);
  },
};
counterObjBroken.bumpLater();
