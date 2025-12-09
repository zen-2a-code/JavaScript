// Generator function: can pause/resume with yield, great when you want values one-at-a-time
// instead of building a big array (saves memory, can model endless streams).
function* countUpTo(max) {
  let current = 1;
  while (current <= max) {
    // yield hands back one value and remembers where it stopped,
    // so the next .next() call continues from here instead of restarting
    yield current;
    current++;
  }
}
const counter = countUpTo(3);
console.log(
  "generator values pulled one by one:",
  counter.next().value,
  counter.next().value,
  counter.next().value
);
// You can also loop through a generator to get values on demand
for (const num of countUpTo(2)) {
  console.log("generator via loop:", num);
}

// next() returns an object: { value: X, done: boolean }
const demo = countUpTo(1);
console.log("next object example:", demo.next()); // { value: 1, done: false }
console.log("next object example (after end):", demo.next()); // { value: undefined, done: true }

// Generator use case example: produce a long list lazily (no big array stored in memory)
function* streamIds() {
  let id = 1;
  while (true) {
    yield id++; // each call to next() gives the next id without keeping a big list
  }
}
const idStream = streamIds();
console.log("next id:", idStream.next().value);
console.log("next id:", idStream.next().value);
console.log("next id:", idStream.next().value);

// Yielding promises (advanced but useful):
// Generators can yield promises too; a runner could await each .value before continuing.
function* asyncSteps() {
  yield Promise.resolve("step 1");
  yield Promise.resolve("step 2");
}
const steps = asyncSteps();
console.log("first yielded promise (not awaited here):", steps.next().value);
console.log("second yielded promise (not awaited here):", steps.next().value);
console.log("second yielded promise (not awaited here):", steps.next().value); // undefined

// Note: To actually await yielded promises, you'd need a runner function that handles that,
// which is more complex and not shown here.
