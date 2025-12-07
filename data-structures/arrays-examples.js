// Array reference sheet for junior devs: common methods + reference vs value + homogeneous vs mixed arrays.

// ----- Homogeneous vs mixed arrays -----
// Homogeneous array (all same type): easier to reason about.
const numbers = [1, 2, 3, 4, 5];
// Mixed (heterogeneous) array: can hold any types, but consistency is harder to maintain.
const mixed = ["reading", 69, true, { mood: "happy" }, ["nested"]];

console.log("numbers:", numbers);
console.log("mixed:", mixed);

// Create arrays in different ways
const empty = []; // literal
const fixedLength = new Array(3); // [empty x3] (use fill/map if you need values)
console.log("empty array:", empty, "| fixed length:", fixedLength);

// ----- Reference vs value -----
// Arrays are reference types: assigning/copying the variable copies the reference, not the contents.
const hobbies = ["reading", "gaming", "coding", "climbing"];
const sameHobbiesRef = hobbies; // both names point to the same array
sameHobbiesRef.push("bouldering"); // changes hobbies too
console.log("hobbies after ref push:", hobbies);

// To copy values (shallow copy): use spread or slice
const hobbiesCopy = [...hobbies]; // new array with same elements
hobbiesCopy.push("eating"); // does NOT affect original
console.log("original hobbies:", hobbies);
console.log("hobbies copy:", hobbiesCopy);

// ----- Common array methods -----
// push: add to end (mutates array), returns new length
hobbies.push("hiking");
console.log("after push:", hobbies);

// pop: remove from end (mutates), returns removed item
const last = hobbies.pop();
console.log("popped item:", last, "| after pop:", hobbies);

// unshift: add to start (mutates)
hobbies.unshift("painting");
console.log("after unshift:", hobbies);

// shift: remove from start (mutates)
const first = hobbies.shift();
console.log("shifted item:", first, "| after shift:", hobbies);

// length: number of items (assigning a smaller length truncates, so be careful)
console.log("hobbies length:", hobbies.length);

// join: turn array into a string with a separator
console.log("join with commas:", hobbies.join(", "));

// forEach: run a function for each item (does NOT build a new array)
hobbies.forEach((h, idx) => console.log("forEach sees:", idx, h));

// map: transform each item, returns new array (does NOT mutate)
const hobbySentences = hobbies.map((hobby) => "One of my hobbies is " + hobby);
console.log("map result:", hobbySentences);

// filter: keep items that match a condition, returns new array
const longNamed = hobbies.filter((h) => h.length > 6);
console.log("filter result (length > 6):", longNamed);

// find: returns the first matching item (or undefined)
const firstWithG = hobbies.find((h) => h.startsWith("g"));
console.log("find startsWith g:", firstWithG);

// findIndex: returns the index of the first match (or -1)
const idxWithG = hobbies.findIndex((h) => h.startsWith("g"));
console.log("findIndex startsWith g:", idxWithG);

// some: true if ANY item matches
const hasCoding = hobbies.some((h) => h === "coding");
console.log("some === 'coding':", hasCoding);

// every: true if ALL items match
const allStrings = hobbies.every((h) => typeof h === "string");
console.log("every is string:", allStrings);

// includes: check existence
console.log("includes 'gaming':", hobbies.includes("gaming"));

// indexOf / lastIndexOf: find positions
console.log("indexOf 'gaming':", hobbies.indexOf("gaming"));

// entries/keys/values: iterators over pairs/indexes/values
for (const [idx, val] of hobbies.entries()) {
  console.log("entries gives index and value:", idx, val);
}

// slice: copy part of array (does NOT mutate)

// slice with no args makes a shallow copy of the whole array
const hobbiesShallowCopy = hobbies.slice();
console.log(
  "slice shallow copy:",
  hobbiesShallowCopy,
  "| original still:",
  hobbies
);

const firstTwo = hobbies.slice(0, 2);
console.log("slice first two:", firstTwo, "| original still:", hobbies);

// splice: remove/insert in place (mutates)
const removed = hobbies.splice(1, 1, "skiing"); // remove 1 at index 1, insert "skiing"
console.log("splice removed:", removed, "| after splice:", hobbies);

// concat: join arrays, returns new array
const moreHobbies = ["running", "yoga"];
const allHobbies = hobbies.concat(moreHobbies);
console.log(
  "concat result:",
  allHobbies,
  "| originals unchanged:",
  hobbies,
  moreHobbies
);

// flat: flatten nested arrays one level (default depth=1)
const nested = [1, [2, [3]]];
console.log("flat one level:", nested.flat());

// reverse: reverses in place (mutates). Copy first if you need the original.
const reversed = [...hobbies].reverse();
console.log("reverse copy:", reversed, "| original still:", hobbies);

// fill: set all/part of an array to a value (mutates)
const filled = new Array(3).fill("x");
console.log("filled array:", filled); // ["x","x","x"]
const filledPartial = [1, 2, 3, 4].fill(0, 1, 3); // fill 0 from index 1 up to (not including) 3
console.log("filled partial:", filledPartial); // [1,0,0,4]

// flatMap: map then flatten one level (good for splitting/expanding items)
const phrases = ["a b", "c d"];
const words = phrases.flatMap((p) => p.split(" "));
console.log("flatMap to words:", words); // ["a","b","c","d"]

// Array.from / Array.of: create arrays from iterables or a list of args
const fromString = Array.from("hey"); // ["h","e","y"]
console.log("Array.from string:", fromString);
const fromMapped = Array.from([1, 2, 3], (n) => n * 2); // map as you build
console.log("Array.from mapped:", fromMapped);
const ofExample = Array.of(1, "two", { three: 3 });
console.log("Array.of example:", ofExample);

// reduce: fold array into a single value; 0 is the initial accumulator value
const totalLength = hobbies.reduce((sum, hobby) => sum + hobby.length, 0);
console.log("reduce total name length:", totalLength);

// sort: sorts array in place; provide compare for predictable order (e.g., numbers)
const nums = [10, 2, 30];
nums.sort((a, b) => a - b); // ascending numeric
console.log("sorted nums:", nums);
// To avoid mutating original, copy first: const sortedCopy = [...nums].sort((a,b)=>a-b);

// ----- Spread syntax (...) -----

// Spread copies elements into a new array (shallow).
const hobbiesSpreadCopy = [...hobbies]; // another way to make a shallow copy

const moreNumbers = [100, ...nums, 999];
console.log("spread into new array:", moreNumbers, "| original nums:", nums);

// Spread can also copy object properties (shallow clone/merge).
const player = { name: "Alex", score: 10 };
const playerSpreadCopy = { ...player }; // shallow copy of object

const updatedPlayer = { ...player, score: 11, level: 2 }; // overrides score, adds level
console.log(
  "spread object clone/merge:",
  updatedPlayer,
  "| original player:",
  player
);
console.log("spread object copy:", playerSpreadCopy);

// ----- Destructuring -----
// Array destructuring pulls out positions.
const [firstNum, secondNum, ...restNums] = moreNumbers; // restNums gathers the remaining items (reset operator)
console.log(
  "array destructuring + rest operator into seperate variables:",
  firstNum,
  secondNum,
  restNums
);

// Object destructuring pulls values by matching keys and creates new const variables (order doesn't matter).
const { name: playerName, score, level = 1 } = updatedPlayer; // default level=1 if missing; note renaming name(key)->playerName(variable)
console.log("object destructuring into variables:", playerName, score, level);

// Destructuring inside function parameters:
// - We destructure personName right in the parameter list.
// - That creates a new local variable personName inside the function,
//   filled from the matching property on the object we pass in.
// - Good practice: use it when you only need a few properties and want clear names.
// - You can also rename while destructuring: { personName: displayName } creates a local displayName.
const person = {
  personName: "Stoyan",
  Age: 29,
  greet() {
    console.log("Hi, I am " + this.personName);
  },
};

const printName = ({ personName }) => {
  // personName comes from the object argument's personName key
  console.log("Destructured name:", personName);
};
printName(person); // pass the whole object; destructuring picks the needed key

// Example of renaming during destructuring in parameters
const printNameRenamed = ({ personName: displayName }) => {
  console.log("Renamed destructured name:", displayName);
};
printNameRenamed(person);

// ----- Rest parameters in functions -----
// Rest parameters gather extra arguments into an array.
function sumAll(...values) {
  return values.reduce((total, n) => total + n, 0);
}
console.log("sumAll(1,2,3,4):", sumAll(1, 2, 3, 4));
