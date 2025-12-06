// Strings, numbers, and JSON basics (junior-friendly)

// ----- Strings -----
const firstName = "Alex";
const hobby = "coding";

// Template literals make readable strings with ${} placeholders
const intro = `Hi, I'm ${firstName} and I like ${hobby}.`;
console.log(intro);

// Common string methods
console.log("length:", hobby.length);
console.log("toUpperCase:", hobby.toUpperCase());
console.log("includes 'cod':", hobby.includes("cod"));
console.log("slice(0, 3):", hobby.slice(0, 3)); // "cod"

// Multiline strings: template literals keep line breaks without special escapes
const poem = `Roses are red,
Violets are blue,
Template literals
Make multiline too.`;
console.log("multiline string:\n", poem);

// Split a string into an array, then join back
const words = "one two three".split(" ");
console.log("split:", words);
console.log("join with commas:", words.join(", "));

// ----- Numbers -----
const priceString = "19.99";
console.log("parseFloat:", parseFloat(priceString)); // 19.99
console.log("parseInt:", parseInt("42", 10)); // 42 (second arg is radix)
console.log("Number(...) to convert:", Number("123")); // 123
console.log("isNaN on bad input:", isNaN(Number("abc"))); // true
console.log("toFixed(2) formats decimals as string:", (12.3456).toFixed(2)); // "12.35"

// ----- JSON -----
// JSON.stringify turns objects/arrays into a JSON string (for saving/sending).
// JSON.parse turns a JSON string back into JS data.
const user = { name: "Alex", age: 30, hobbies: ["coding", "music"] };
const json = JSON.stringify(user);
console.log("JSON string:", json);

const parsed = JSON.parse(json);
console.log("parsed back to object:", parsed, "name:", parsed.name);

// Handle parse errors with try/catch when the input might be invalid JSON.
try {
  JSON.parse("not valid json");
} catch (err) {
  console.error("JSON parse failed:", err.message);
}
