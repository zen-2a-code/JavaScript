// Modules and imports (junior-friendly)
// Two common module systems in JS:
// - CommonJS (CJS): require/module.exports (Node.js default unless using ESM)
// - ES Modules (ESM): import/export (browser and modern Node with "type": "module" or .mjs)
// Choose one per project to avoid mixing headaches.

// ----- CommonJS style -----
function add(a, b) {
  return a + b;
}
function greet(name = "world") {
  return `Hello, ${name}`;
}

// Export for CommonJS consumers
module.exports = { add, greet };

// Example (would be in another file, using require):
// const { add, greet } = require("./modules-and-imports");
// console.log(add(2, 3));
// console.log(greet("Alex"));

// ----- ES Module style (when "type": "module" in package.json or using .mjs) -----
// export function multiply(a, b) { return a * b; }
// export const appName = "My App";
// export default function double(n) { return n * 2; }
//
// Example (would be in another file, using import):
// import double, { multiply, appName } from "./modules-and-imports.js";
// console.log(appName);
// console.log(multiply(2, 4));
// console.log(double(5));

// ----- Notes and best practices -----
// - Pick one module system per project (CJS or ESM) to avoid confusion.
// - In Node, CJS uses require/module.exports; ESM uses import/export.
// - Use default exports sparingly; named exports make refactoring and auto-imports clearer.
// - Use relative paths for local files ("./utils.js") and bare specifiers for packages ("react").
// - For ESM in Node, set "type": "module" in package.json or use .mjs file extension.
