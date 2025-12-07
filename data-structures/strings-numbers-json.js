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
console.log("trim removes whitespace:", "  hi  ".trim()); // "hi"
console.log("replace:", "hello world".replace("world", "JS")); // "hello JS"
console.log("repeat:", "ha".repeat(3)); // "hahaha"

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
console.log("startsWith / endsWith:", "javascript".startsWith("java"), "javascript".endsWith("script"));

// ----- Numbers -----
const priceString = "19.99";
console.log("parseFloat:", parseFloat(priceString)); // 19.99
console.log("parseInt:", parseInt("42", 10)); // 42 (second arg is radix)
console.log("Number(...) to convert:", Number("123")); // 123
console.log("isNaN on bad input:", isNaN(Number("abc"))); // true
console.log("toFixed(2) formats decimals as string:", (12.3456).toFixed(2)); // "12.35"
console.log("Math.round:", Math.round(1.6), "| Math.floor:", Math.floor(1.6), "| Math.ceil:", Math.ceil(1.1));
console.log("Math.min/Math.max:", Math.min(1, 5, -2), Math.max(1, 5, -2));
console.log("isFinite (filters out NaN/Infinity):", isFinite(10 / 2), isFinite(10 / 0)); // true, false

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

// JSON pitfalls: functions, undefined, Dates, and Symbols are not preserved by JSON stringify/parse.
const tricky = { fn: () => {}, undef: undefined, date: new Date(), sym: Symbol("id") };
const trickyJson = JSON.stringify(tricky);
console.log("tricky JSON (functions/undefined/symbol dropped, dates stringified):", trickyJson);
console.log("parsed tricky:", JSON.parse(trickyJson)); // fn/undef/sym gone, date is a string
