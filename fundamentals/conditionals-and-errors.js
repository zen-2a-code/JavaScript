// Conditionals and error handling (junior-friendly reference)

const age = 17;
const role = "user";

// ----- if / else if / else -----
if (age >= 18) {
  console.log("You are an adult.");
} else if (age >= 13) {
  console.log("You are a teenager.");
} else {
  console.log("You are a kid.");
}

// ----- Ternary operator (cond ? a : b) -----
const canVote = age >= 18 ? "yes" : "no";
console.log("Can vote?", canVote);

// ----- switch (when many discrete cases) -----
switch (role) {
  case "admin":
    console.log("Welcome, admin");
    break;
  case "editor":
    console.log("Welcome, editor");
    break;
  default:
    console.log("Welcome, user");
}

// ----- Error handling: throw, try/catch/finally -----
function divide(a, b) {
  if (b === 0) {
    // Throw an Error to signal something went wrong.
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  console.log("divide 10/2:", divide(10, 2));
  console.log("divide 10/0:", divide(10, 0)); // this will throw
} catch (err) {
  // This runs when an error is thrown inside try.
  console.error("Caught error:", err.message);
} finally {
  // Runs whether or not an error happened (good for cleanup).
  console.log("finally block always runs");
}

// ----- Custom errors (extend Error) -----
// Create your own error types for clearer intent (e.g., ValidationError, NotFoundError).
class ValidationError extends Error {
  constructor(message) {
    super(message); // call Error constructor so message/stack are set
    this.name = "ValidationError"; // name helps identify the error type
  }
}

function requireName(user) {
  if (!user.name) {
    // Throwing a custom error makes it easy to handle this specific failure
    throw new ValidationError("Name is required");
  }
  return "Name ok: " + user.name;
}

try {
  console.log(requireName({})); // missing name, will throw
} catch (err) {
  // instanceof lets you handle specific error types differently
  if (err instanceof ValidationError) {
    console.error("Validation failed:", err.message);
  } else {
    console.error("Unknown error:", err);
  }
}

// ----- Async error handling note -----
// In Promises, use .catch(...) to handle rejections.
// In async/await, wrap await calls in try/catch.
// See async-examples.js for detailed promise and async/await patterns.
