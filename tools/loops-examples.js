// Loop reference for junior devs
// Covers: for, while, do...while, for...of, for...in, break/continue, ++/--.

const numbers = [1, 2, 3];
const user = { name: "Alex", age: 30, role: "dev" };

// ----- Classic for loop (use when you need an index) -----
for (let i = 0; i < numbers.length; i++) {
  console.log("for loop index", i, "value", numbers[i]);
}

// ----- while loop (runs while condition stays true) -----
let count = 0;
while (count < 3) {
  console.log("while count:", count);
  count++; // ++ increments by 1
}

// ----- do...while loop (runs at least once) -----
let tries = 0;
do {
  console.log("do...while try:", tries);
  tries++;
} while (tries < 2);

// ----- for...of (loop over iterable values like arrays/strings) -----
for (const num of numbers) {
  console.log("for...of number:", num);
}

// ----- for...in (loop over object keys) -----
// Use on plain objects; with arrays it gives indexes as strings (less common).
for (const key in user) {
  console.log("for...in key:", key, "value:", user[key]);
}

// ----- break and continue -----
// break stops the loop early; continue skips to the next iteration.
for (const num of [10, 20, 30, 40]) {
  if (num === 20) continue; // skip 20
  if (num === 40) break; // stop when reaching 40
  console.log("break/continue example:", num);
}

// ----- forEach vs map vs for...of quick note -----
// - forEach: runs a function for each item, no return value collected.
// - map: builds a new array from return values.
// - for...of: simple looping when you just need the values.
numbers.forEach((n) => console.log("forEach sees:", n));
const doubled = numbers.map((n) => n * 2);
console.log("map doubled:", doubled);

// ----- Reverse loops and counting down -----
for (let i = numbers.length - 1; i >= 0; i--) {
  console.log("reverse for loop index", i, "value", numbers[i]);
}

// ----- Nested loops (be mindful of performance) -----
const matrix = [
  [1, 2],
  [3, 4],
];
for (const row of matrix) {
  for (const cell of row) {
    console.log("nested loop cell:", cell);
  }
}
