// Function styles with use cases

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
console.log(summarizeUser("Stoyan", 29, true));

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
console.log(summarizeUserArrow("Stoyan", 29, true));

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

// Rest parameters: gather extra args into an array
function sumAll(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}
console.log("sumAll(1,2,3):", sumAll(1, 2, 3));

// Inline anonymous function passed directly as a callback (not saved to a variable)
[1, 2, 3].forEach(function (num) {
  console.log("inline callback hit:", num);
});

// Callback shape differences:
// - If a callback needs its own this, use a regular function.
// - If you want to keep the outer this (e.g., inside a method), use an arrow function.

// Default parameters: provide fallbacks when args are missing/undefined
function greet(name = "stranger") {
  return "Hello, " + name;
}
console.log(greet("Pat"));
console.log(greet()); // uses default

// Immediately Invoked Function Expression (IIFE): run setup code once right away
// Use case: create a tiny private scope so setup variables don't leak into the rest of the file.
(function () {
  const setupMessage = "IIFE ran right away and cleaned up after itself";
  console.log(setupMessage);
})();

// Hoisting note:
// - Function declarations are hoisted (you can call them before their definition).
// - Function expressions/arrow functions are not hoisted the same way; they exist after the assignment line.
