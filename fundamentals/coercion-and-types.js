// Data types and coercion reference (junior friendly)

// ----- Primitive data types -----
const str = "hello"; // string
const num = 42; // number (integers and floats are both 'number')
const big = 42n; // bigint (for very large integers)
const bool = true; // boolean
const undef = undefined; // undefined (no value)
const nul = null; // null (intentional "empty" value)
const sym = Symbol("id"); // symbol (unique identifiers)

// ----- Reference types -----
const obj = { a: 1 }; // object
const arr = [1, 2, 3]; // array (also an object)
function fn() {} // function (callable object)

console.log("primitives:", str, num, big, bool, undef, nul, sym);
console.log("references:", obj, arr, fn);

// See operators-reference.js for a full list of operators and examples.

// ----- Type coercion notes -----
// Coercion: JavaScript converts values to another type in loose equality (==) and some operators.
console.log("'5' * 2 (string -> number):", "5" * 2); // 10 (string coerced to number)
console.log("5 + '5' (number -> string):", 5 + "5"); // "55" (number coerced to string for concatenation)
console.log("Boolean(''):", Boolean("")); // false (empty string is falsy)
console.log("Boolean('hello'):", Boolean("hello")); // true (non-empty string is truthy)
// Common falsy values: false, 0, "", null, undefined, NaN. Everything else is truthy.

// ----- typeof quirks -----
console.log("typeof null:", typeof null); // "object" (legacy quirk)
console.log("typeof undefined:", typeof undefined); // "undefined"
console.log("typeof function:", typeof fn); // "function"
console.log("typeof array:", typeof arr); // "object"
console.log("Array.isArray(arr):", Array.isArray(arr)); // true
