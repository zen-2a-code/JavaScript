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
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function requireName(user) {
  if (!user.name) {
    throw new ValidationError("Name is required");
  }
  return "Name ok: " + user.name;
}

try {
  console.log(requireName({})); // missing name, will throw
} catch (err) {
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
