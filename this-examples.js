// this keyword examples
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
//   We still use this to talk to the counterObj defined outside (where value lives).
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
