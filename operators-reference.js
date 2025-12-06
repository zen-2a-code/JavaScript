// Operators reference (junior friendly)
// Covers: arithmetic, assignment, comparison, logical, nullish, optional chaining, ternary,
// increment/decrement, bitwise, spread/rest note, and short-circuiting.

// ----- Arithmetic operators -----
console.log("add 1 + 2 =", 1 + 2);
console.log("subtract 5 - 3 =", 5 - 3);
console.log("multiply 4 * 2 =", 4 * 2);
console.log("divide 8 / 2 =", 8 / 2);
console.log("modulus 7 % 3 =", 7 % 3); // remainder
console.log("exponent 2 ** 3 =", 2 ** 3);

// ----- Assignment operators -----
let x = 5;
x += 2; // same as x = x + 2
x -= 1; // same as x = x - 1
x *= 3; // same as x = x * 3
x /= 2; // same as x = x / 2
x %= 2; // same as x = x % 2
console.log("assignment operators result:", x);

// ----- Comparison operators -----
console.log("5 == '5' (loose, coerces):", 5 == "5"); // true (string -> number)
console.log("5 === '5' (strict, no coercion):", 5 === "5"); // false
console.log("5 != '5' (loose, coerces):", 5 != "5"); // false
console.log("5 !== '5' (strict):", 5 !== "5"); // true
console.log("3 > 2:", 3 > 2, "2 <= 2:", 2 <= 2);

// ----- Logical operators (short-circuit) -----
// && returns first falsy or last truthy; || returns first truthy or last falsy.
console.log("true && false:", true && false);
console.log("true || false:", true || false);
console.log("!true:", !true);
console.log("'hi' && 123:", "hi" && 123); // returns 123 because 'hi' is truthy
console.log("0 || 'fallback':", 0 || "fallback"); // returns 'fallback' because 0 is falsy

// ----- Nullish coalescing (??) -----
// Provides default only when left side is null or undefined (not 0/''/false).
console.log("null ?? 'default':", null ?? "default"); // 'default'
console.log("0 ?? 'default':", 0 ?? "default"); // 0 (0 is not nullish)

// ----- Optional chaining (?.) -----
// Safely access deep properties; returns undefined instead of throwing if a part is null/undefined.
const maybeUser = { profile: { city: "NYC" } };
console.log("maybeUser.profile?.city:", maybeUser.profile?.city); // "NYC"
console.log("maybeUser.profile?.zip:", maybeUser.profile?.zip); // undefined (no crash)

// ----- Ternary operator -----
const age = 17;
const canVote = age >= 18 ? "yes" : "no";
console.log("ternary canVote:", canVote);

// ----- Increment/Decrement -----
let counter = 0;
console.log("counter++ returns old then adds:", counter++); // 0, counter becomes 1
console.log("after counter++:", counter); // 1
console.log("++counter adds then returns:", ++counter); // 2

// ----- Bitwise (rare for beginners, included for completeness) -----
// Operate on 32-bit integers.
console.log("5 & 3 (AND):", 5 & 3); // 0101 & 0011 = 0001 -> 1
console.log("5 | 3 (OR):", 5 | 3); // 0101 | 0011 = 0111 -> 7
console.log("5 ^ 3 (XOR):", 5 ^ 3); // 0101 ^ 0011 = 0110 -> 6
console.log("~5 (NOT):", ~5); // bitwise NOT
console.log("5 << 1 (left shift):", 5 << 1); // 10
console.log("5 >> 1 (right shift):", 5 >> 1); // 2

// ----- Type / property checks -----
console.log("typeof 123:", typeof 123); // "number"
console.log("instanceof (array vs Object):", [] instanceof Array, [] instanceof Object); // true true
const user = { name: "Alex" };
console.log("'name' in user:", "name" in user); // true
// delete removes a property from an object
delete user.name;
console.log("'name' after delete:", "name" in user); // false

// ----- Spread/Rest (syntax operators) -----
// Spread expands arrays/objects; rest gathers arguments.
const nums = [1, 2, 3];
const numsCopy = [...nums]; // spread into a new array
console.log("spread array copy:", numsCopy);
const merged = { a: 1, ...{ b: 2 } };
console.log("spread object merge:", merged);
function logAll(...args) {
  console.log("rest args array:", args);
}
logAll("a", "b", "c");

// ----- Reminder about coercion -----
// Loose equality (==) and some operators coerce types (e.g., "5" * 2 -> 10).
// For detailed coercion notes, see coercion-and-types.js.
