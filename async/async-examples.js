// ----- Sync vs Async basics -----
// This section demonstrates the difference between synchronous (runs immediately in order)
// and asynchronous operations (scheduled for later).
// Synchronous code runs line by line, waiting for each line to finish before moving on.
// Asynchronous code allows the program to continue working while waiting for slow tasks (like timers, network requests)
// to complete in the background. This is like sending a request and doing other work
// until the response comes back.

// Async code is scheduled for later; it does NOT block the rest of your code.
// setTimeout registers a callback to run after the specified delay (here ~2 seconds).
// The event loop will pick it up later; meanwhile, the code keeps running.
// We use setTimeout here just to simulate a delay.
setTimeout(() => {
  console.log("timer is done (async callback after 2s)");
}, 2000);

// setInterval runs a callback repeatedly on a timer until you stop it.
// Goal: show it fires multiple times and how to stop it with clearInterval.
// Why async? setInterval schedules work in the future; code after it keeps running.
// intervalId is just the timer's ID number; clearInterval(intervalId) tells the runtime to stop scheduling that callback.
let ticks = 0; // count how many times the interval fired
const intervalId = setInterval(() => {
  ticks++; // increment the count each time it fires
  console.log("interval tick:", ticks);
  if (ticks >= 3) {
    clearInterval(intervalId); // stop further ticks once we hit 3
    console.log("interval cleared");
  }
}, 300); // runs every ~300ms
// intervalId is a number (timer ID); clearInterval uses it to cancel future runs.

// Note on the event loop: Promise callbacks (microtasks) run before timers (macrotasks)
// once the call stack is clear. That's why Promise.then handlers often fire before setTimeout 0.

// Sync code runs now, line by line (no waiting).
// These two lines run synchronously one after the other. They print to the console immediately.
console.log("sync hello"); // runs immediately (synchronous)
console.log("sync hi"); // runs immediately (synchronous)

// ----- Async with callbacks (classic pattern) -----
// Define a function that finishes later and uses a callback to hand back data.
// The parameter `callback` is itself a function; it tells fetchDataWithCallback what to do when the data is ready.
function fetchDataWithCallback(callback) {
  // Simulate a delay using setTimeout. After 1.5 seconds we call the callback with the result.
  setTimeout(() => {
    // call the provided callback function with the result. This hands the data back to the caller.
    callback("done via callback"); // call back after 1.5s
  }, 1500);
}

// Use the function: pass what should happen when the async work is finished.
fetchDataWithCallback((text) => {
  // We pass an anonymous arrow function as the callback. This function will run later with the result text.
  console.log("callback result:", text);
});

// ----- Promises: cleaner than deeply nested callbacks -----
function fetchDataWithPromise() {
  // Create and return a Promise that resolves when the async task finishes.
  // A Promise represents a value that may be available now, or in the future, or never.
  return new Promise((resolve, reject) => {
    // Simulate asynchronous work with a timeout.
    setTimeout(() => {
      // Call resolve to fulfill (success path) with a result. The caller will see this value.
      resolve("done via promise");
      // If there were an error, we'd call reject(error) instead (signals failure).
    }, 1500);
  });
}

fetchDataWithPromise()
  // Call the promise-returning function and chain handlers with .then() and .catch().
  // .then() runs when the promise resolves successfully. Each .then returns a new promise, enabling chaining.
  // .then receives the resolved value (any type: string/object/etc) from the previous promise.
  .then((text) => {
    console.log("promise then:", text);
    // Return another promise to chain (avoid nesting). This keeps code flat.
    // Here we call it twice to demonstrate chaining; in real code, chain as many steps as you need
    // (e.g., fetch -> parse -> transform -> save), each step returning a promise.
    return fetchDataWithPromise();
  })
  .then((text) => {
    console.log("second then from chain:", text);
  })
  // .catch() runs if any promise in the chain is rejected or an error is thrown.
  .catch((err) => {
    // Catch any rejection in the chain.
    console.error("promise error:", err);
  });

// ----- Promise utilities: all, race, allSettled -----
// Promise.all waits for all to fulfill (or rejects fast if any reject).
const p1 = fetchDataWithPromise(); // resolves after ~1.5s
const p2 = fetchDataWithPromise(); // another one
Promise.all([p1, p2])
  .then((results) => {
    console.log("Promise.all results:", results);
  })
  .catch((err) => {
    console.error("Promise.all rejected fast:", err);
  });

// Promise.allSettled waits for all and gives each status (never rejects as a whole).
Promise.allSettled([
  fetchDataWithPromise(),
  fetchDataWithPossibleError(true),
]).then((results) => {
  console.log("Promise.allSettled results:", results);
});

// Promise.race resolves/rejects as soon as the first promise settles.
Promise.race([fetchDataWithPromise(), fetchDataWithPossibleError(true)])
  .then((val) => console.log("Promise.race winner:", val))
  .catch((err) => console.error("Promise.race error:", err));

// Promise with a rejection example
function fetchDataWithPossibleError(shouldFail) {
  // Return a new Promise that either resolves or rejects based on the shouldFail flag.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        // Rejecting the promise triggers the .catch() handler.
        reject("something went wrong"); // go to catch
      } else {
        // Resolving the promise triggers the .then() handler.
        resolve("all good"); // go to then
      }
    }, 800);
  });
}

// Demonstrate handling both success and error cases with .then(), .catch(), and .finally().
fetchDataWithPossibleError(true)
  .then((text) => {
    console.log("will not run when shouldFail=true:", text);
  })
  .catch((err) => {
    console.error("caught rejection:", err);
  })
  .finally(() => {
    // runs whether resolved or rejected
    console.log("finally: cleanup or logging");
  });

// Notes on chaining:
// - Each .then waits for the previous promise to resolve before running.
// - Returning a value from .then passes it to the next .then.
// - Returning a promise from .then makes the chain wait for that promise.
// - reject (or thrown errors) jump to the nearest .catch.
// - .finally runs after the chain finishes, success or error (doesn't get the result).

// Best practice tips (comments):
// - Prefer Promises or async/await over nested callbacks for readability.
// - Always return your Promise from functions so callers can chain/await it.
// - Add .catch for error handling (or use try/catch with async/await).
// - A chain works left-to-right: each .then waits for the previous promise to resolve.
// - reject triggers the nearest .catch; without a catch, errors are unhandled.

// Async function: returns a Promise, lets you write async code that looks sync
async function fetchFakeData() {
  return "pretend data";
}
fetchFakeData().then((data) => console.log("async function result:", data));

// ----- Async/Await: modern syntax -----
// The async keyword before a function makes it always return a Promise.
// Inside an async function you can use await to pause execution until a Promise settles.
// This lets you write asynchronous code that looks synchronous and is easier to read.

// Example: rewrite fetchDataWithPromise using async/await.
async function fetchDataWithAsyncAwait() {
  // Wait for fetchDataWithPromise() to resolve, without blocking the rest of the program.
  const data = await fetchDataWithPromise();
  // Returning a value from an async function automatically wraps it in a resolved Promise.
  return data;
}

// Async function with error handling using try/catch.
async function fetchWithErrorHandling(shouldFail) {
  try {
    // Await may throw if the promise rejects; we handle errors in the catch block.
    const result = await fetchDataWithPossibleError(shouldFail);
    console.log("async/await success:", result);
  } catch (err) {
    console.error("async/await caught error:", err);
  } finally {
    // finally runs after try/catch regardless of success or failure.
    console.log("async/await: finished");
  }
}

// Call the async functions. The returned promises can still be used with .then().
fetchDataWithAsyncAwait().then((data) => {
  console.log("result from async function:", data);
});

// Demonstrate both success and error cases with async/await.
fetchWithErrorHandling(false); // logs success
fetchWithErrorHandling(true); // logs error

// You can also use an immediately invoked async function expression (IIFE) at the top level.
(async () => {
  const data = await fetchDataWithPromise();
  console.log("IIFE async result:", data);
})();

// Real-world network example (commented to avoid actual network calls here):
// async function loadUser() {
//   try {
//     const res = await fetch("https://api.example.com/user");
//     if (!res.ok) throw new Error("Network response was not ok");
//     const data = await res.json();
//     console.log("fetched user:", data);
//   } catch (err) {
//     console.error("fetch failed:", err.message);
//   }
// }

// ----- Sequential vs parallel with async/await -----
// Awaiting inside a loop can be serial (slower); to run tasks in parallel, start them and await Promise.all.
async function loadInParallel() {
  const promiseA = fetchDataWithPromise(); // starts async work
  const promiseB = fetchDataWithPromise(); // starts another
  const [a, b] = await Promise.all([promiseA, promiseB]); // wait for both
  console.log("parallel results:", a, b);
}
loadInParallel();
