// Variable declarations (scoping + hoisting)
// Tip: add "use strict"; at the top of files to catch mistakes (like accidental globals).
// Strict mode does NOT enforce types; it just makes JS throw instead of silently doing unsafe things.
// Example: assigning to an undeclared variable normally creates a global (bug); in strict mode it throws.

// var -> function-scoped, hoisted (shows up as undefined before its line), can redeclare/reassign
var myName = "Stoyan";

// let -> block-scoped, NOT usable before its line (temporal dead zone), can reassign
let age = 29;

// const -> block-scoped, NOT usable before its line, cannot reassign (but objects inside can change)
const hasHobbies = true;

// No keyword -> creates/uses a global in non-strict mode (accidental globals are bugs, avoid this)
accidentalGlobalColor = "blue"; // <-- will end up on global This

// Hoisting demo: var is hoisted (shows undefined); let/const throw if accessed too early
console.log("hoistedVar before assign:", hoistedVar); // undefined, because var is hoisted
var hoistedVar = "set later";

try {
  console.log(beforeLet); // ReferenceError because let is NOT accessible before its line
  let beforeLet = "won't get here";
} catch (err) {
  console.log("beforeLet access failed (TDZ):", err.message);
}

// ----- Function scoping examples -----
function scopedExample() {
  var fnVar = "function var"; // function-scoped
  let fnLet = "function let"; // block-scoped
  if (true) {
    let blockLet = "block let";
    var hoistedVar = "still function-scoped"; // var ignores block boundaries
    console.log("inside block:", blockLet, fnVar, fnLet, hoistedVar);
  }
  // console.log(blockLet); // would throw (blockLet is block-scoped)
  console.log("outside block:", fnVar, fnLet, hoistedVar); // hoistedVar is visible here
}
scopedExample();
