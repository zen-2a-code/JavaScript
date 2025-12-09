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
  describeArrow: () =>
    "Arrow this firstName is " + (this.firstName || "undefined"),
};
console.log("describe():", user.describe());
console.log("describeArrow():", user.describeArrow());

// Borrowing a method (this follows the caller):
const otherUser = { firstName: "Sam", describe: user.describe };
console.log("borrowed describe():", otherUser.describe()); // this is otherUser here

// this with callbacks:
// - Arrow functions do NOT get their own this; they reuse the this from the surrounding scope.
// - Here the surrounding scope is bumpLater, so this stays as counterObj and can reach its properties (value) and methods.
// - The curly braces of bumpLater are just the function body; they do NOT create a new object.
//   We still use this to talk to the counterObj defined outside (where value lives).
// - Safe rule: inside a method, if you pass a callback and want to keep the method's this, use an arrow.
// - Why use an arrow here? Because setTimeout will call the callback with no object, so a regular function would lose this.
// - setTimeout calls the callback as a plain function (no object), so a regular callback gets its own this (undefined in strict mode).
// - An arrow callback instead captures bumpLater's this (counterObj), so this.value still points to the instance.
const counterObj = {
  value: 0,
  bumpLater() {
    setTimeout(() => {
      // Arrow keeps this pointing to counterObj (it captures the this of bumpLater at call time).
      // bumpLater was called as counterObj.bumpLater(), so its this is counterObj.
      // The arrow does NOT create a new this; it reuses bumpLater's this, not setTimeout's.
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
      // Regular functions get their this from how they are called:
      // - obj.method() -> this = obj
      // - standaloneFunction() -> this = undefined (strict) or global (non-strict)
      // setTimeout calls this callback as timeoutCallback(), with no object before the dot,
      // so here this is undefined (strict mode) or the global object (non-strict).
      // That means we are NOT pointing at counterObjBroken, so value is not updated.
      console.log("regular function this is:", this);
    }, 0);
  },
};
counterObjBroken.bumpLater();

// Fixing the regular function case with bind (locks this to counterObjBroken)
const counterObjFixed = {
  value: 0,
  bumpLater() {
    setTimeout(
      function () {
        this.value++;
        console.log("fixed regular function this:", this.value);
      }.bind(this),
      0
    );
  },
};
counterObjFixed.bumpLater();

// Quick guide:
// - Use arrow when you want to capture outer this (common in callbacks inside methods).
// - Use regular functions when you want this to be set by how it's called (e.g., event handlers you bind manually, methods on objects).

// Extra: losing this when extracting a method, and fixing it with bind
const looseDescribe = user.describe;
console.log("loose describe (this lost):", looseDescribe()); // undefined in strict mode
const boundDescribe = user.describe.bind(user);
console.log("bound describe (this fixed):", boundDescribe());

// call/apply can also set this for one-off calls
function show(prefix) {
  return prefix + this.firstName;
}
console.log("call with this set to user:", show.call(user, "Hi ")); // "Hi Alex"
console.log(
  "apply with this set to otherUser:",
  show.apply(otherUser, ["Hello "])
); // "Hello Sam"
