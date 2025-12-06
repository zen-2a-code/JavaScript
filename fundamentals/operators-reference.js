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
console.log("true && false:", true && false); // returns false
console.log("true || false:", true || false); // retruns true
console.log("!true:", !true); // returns false
console.log("'hi' && 123:", "hi" && 123); // returns 123 because 'hi' is truthy
console.log("0 || 'fallback':", 0 || "fallback"); // returns 'fallback' because 0 is falsy
console.log("null || 'default':", null || "default"); // returns "default" because null is falsy
console.log("'' && 'won't show':", "" && "won't show"); // returns "" (stops at falsy)
console.log("'start' || 'alt':", "start" || "alt"); // returns "start" (first truthy)
console.log("1 && 'next':", 1 && "next"); // returns "next" (all truthy, so last value)

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

// ----- Type / property checks -----
console.log("typeof 123:", typeof 123); // "number"
// instanceof walks the prototype chain: arrays inherit from Array and also from Object
console.log("[] instanceof Array:", [] instanceof Array); // true (Array.prototype is in the chain)
console.log("[] instanceof Object:", [] instanceof Object); // true (all arrays are also objects)
const user = { name: "Alex" };
// "name" in user checks if the key exists (own or inherited)
console.log("'name' in user:", "name" in user); // true (key is present)
// delete removes a property from an object (careful: only use on objects, not on variables)
delete user.name;
console.log("'name' after delete:", "name" in user); // false

// ----- Spread/Rest (syntax operators) -----
// Spread expands arrays/objects; rest gathers arguments.
const nums = [1, 2, 3];
const numsCopy = [...nums]; // spread into a new array (shallow copy)
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

// ----- Bitwise (rare for beginners, included for completeness) -----
// A bit is a 0 or 1 in the binary form of a number. 5 in binary is 0101; 3 is 0011 (showing 4 bits).
// Bitwise operators work on these bits (as 32-bit ints), unlike +, -, * which work on full numbers.
// Use cases: compact flags/permissions (turn bits on/off), low-level protocols, some performance tricks.
console.log("5 & 3 (AND):", 5 & 3); // 0101 & 0011 = 0001 -> 1 (AND compares each column: 1&0=0, 1&1=1, result 0001 = 1)
console.log("5 | 3 (OR):", 5 | 3); // 0101 | 0011 = 0111 -> 7 (OR per column: 0|0=0, 1|0=1, 1|1=1, result 0111 = 7)
console.log("5 ^ 3 (XOR):", 5 ^ 3); // 0101 ^ 0011 = 0110 -> 6 (XOR per column: 1 if bits differ, 0 if same; result 0110 = 6)
console.log("~5 (NOT):", ~5); // ~0101 = ...1010 -> -6 (NOT flips every bit; 0101 becomes ...1010 in 32-bit two's complement, which is -6)
console.log("5 << 1 (left shift):", 5 << 1); // 0101 <<1 = 1010 -> 10 (shift left, add 0 on right; bits become 1010 which is 8+2=10)
console.log("5 >> 1 (right shift):", 5 >> 1); // 0101 >>1 = 0010 -> 2 (shift right, drop rightmost bit; bits become 0010 which is 2)

// Example: using bits as flags (compact booleans)
// Suppose we store permissions: 1 = canRead, 2 = canWrite, 4 = isAdmin
const CAN_READ = 1; // 001
const CAN_WRITE = 2; // 010
const IS_ADMIN = 4; // 100

let perms = 0;
perms |= CAN_READ; // turn on read bit
perms |= CAN_WRITE; // turn on write bit
console.log("perms after read+write:", perms, "binary:", perms.toString(2)); // 3, "11"

// Check a flag with AND: if result is non-zero, flag is set
console.log("has write?", (perms & CAN_WRITE) !== 0); // true
console.log("has admin?", (perms & IS_ADMIN) !== 0); // false

// Turn off a flag with AND + NOT
perms &= ~CAN_WRITE; // flip write bit to 0
console.log("perms after removing write:", perms, "binary:", perms.toString(2)); // 1, "1"
