// Regular expressions (regex) basics (junior-friendly)
// Use regex to search/match patterns in strings.

const text = "My email is test@example.com and phone is 123-456-7890.";

// ----- Simple patterns -----
const emailRegex = /\S+@\S+\.\S+/; // very loose email matcher (demo only)
console.log("email match:", emailRegex.test(text)); // true

const phoneRegex = /\d{3}-\d{3}-\d{4}/; // 3 digits - 3 digits - 4 digits
console.log("phone match:", phoneRegex.test(text)); // true

// ----- Flags -----
// i = case-insensitive, g = global (find all), m = multiline
const wordRegex = /is/gi; // find "is" ignoring case, globally
console.log("matches for 'is':", text.match(wordRegex)); // ["is", "is"]

// ----- Capture groups -----
const name = "Hello Alex Smith";
const nameRegex = /Hello (\w+) (\w+)/;
const nameMatch = name.match(nameRegex);
console.log("captured first and last:", nameMatch[1], nameMatch[2]); // Alex Smith

// ----- Replace with regex -----
const cleaned = text.replace(/\d/g, "X"); // replace all digits with X
console.log("digits replaced:", cleaned);

// ----- Using RegExp constructor (when building from variables) -----
const dynamicWord = "email";
const dynamicRegex = new RegExp(dynamicWord, "i");
console.log("dynamic regex test:", dynamicRegex.test(text));

// ----- Notes and best practices -----
// - Keep patterns as simple as possible; complex patterns can be hard to read.
// - Use anchors ^ (start) and $ (end) when you need full-string matches.
// - Escape special characters if you want literals (e.g., use \\+ to match a plus sign).
// - For real email/phone validation, use well-tested libraries or simpler checks; regex alone can be brittle.
// - test() returns true/false; match()/matchAll() return the matches; replace() swaps content.

// ----- Quick pattern map (cheat sheet) -----
const patternCheatSheet = {
  digit: "\\d", // any digit [0-9]
  nonDigit: "\\D", // not a digit
  wordChar: "\\w", // letter/number/_ (ASCII)
  nonWordChar: "\\W", // not a word char
  whitespace: "\\s", // space, tab, newline
  nonWhitespace: "\\S", // not whitespace
  anyChar: ".", // any char except newline (by default)
  start: "^", // start of string (or line with m flag)
  end: "$", // end of string (or line with m flag)
  zeroOrMore: "*", // 0 or more
  oneOrMore: "+", // 1 or more
  zeroOrOne: "?", // 0 or 1 (optional)
  exactlyN: "{n}", // exactly n times
  betweenNM: "{n,m}", // between n and m times
  or: "|", // alternation (this|that)
  group: "( )", // capture group
  nonCaptureGroup: "(?: )", // group without capturing
  charClass: "[abc]", // a or b or c
  charRange: "[a-z]", // any lowercase letter a to z
  negateClass: "[^abc]", // anything except a/b/c
  lookaheadPos: "(?=x)", // positive lookahead (followed by x)
  lookaheadNeg: "(?!x)", // negative lookahead (not followed by x)
};
console.log("regex pattern cheat sheet:", patternCheatSheet);
