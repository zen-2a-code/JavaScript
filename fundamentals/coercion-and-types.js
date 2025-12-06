// Data types and coercion reference (junior friendly)

// ----- Primitive data types -----
const str = "hello"; // string
const num = 42; // number (integers and floats are both 'number')
const big = 42n; // bigint (for very large integers)
const bool = true; // boolean
const undef = undefined; // undefined (no value assigned; default for uninitialized variables/params/properties)
const nul = null; // null (you manually set this to say "nothing here" on purpose)
// Think: undefined = not set yet (JS default); null = you set it to empty on purpose.
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
// Common falsy values: false, 0, "", null, undefined, NaN.
//  Everything else is truthy.
// "0"// true (non-empty string is truthy)
// [] // true (arrays are truthy even if empty)
// {} // true (objects are truthy)

// ----- typeof quirks (watch out for these surprising results) -----
console.log("typeof null:", typeof null); // "object" (quirk: null is a primitive but reports object; don't rely on typeof for null)
console.log("typeof undefined:", typeof undefined); // "undefined" (the only value with this type; use it to check missing values)
console.log("typeof NaN:", typeof NaN); // "number" (funny because NaN means Not-a-Number but lives in the number type)
console.log("typeof true:", typeof true); // "boolean" (normal)
console.log("typeof 'hi':", typeof "hi"); // "string" (normal)
console.log("typeof function:", typeof fn); // "function" (special label for callable objects; technically still objects)
console.log("typeof class {}:", typeof class {}); // "function" (classes compile to functions; so typeof shows function)
console.log("typeof array:", typeof arr); // "object" (arrays are objects; use Array.isArray to check for arrays)
console.log("Array.isArray(arr):", Array.isArray(arr)); // true (safe way to detect arrays)
console.log("typeof new Date():", typeof new Date()); // "object" (Date is an object; use date methods instead of typeof)
console.log("typeof new Map():", typeof new Map()); // "object" (Map/Set/RegExp/Date all report object)
console.log("typeof /regex/:", typeof /regex/); // "object" (RegExp reports object)
console.log("typeof 10n (BigInt):", typeof 10n); // "bigint" (dedicated type for large integers)
console.log("typeof Symbol():", typeof Symbol()); // "symbol" (dedicated type for unique identifiers)
