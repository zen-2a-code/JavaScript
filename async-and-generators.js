// Async function: returns a Promise, lets you write async code that looks sync
async function fetchFakeData() {
  return "pretend data";
}
fetchFakeData().then((data) => console.log("async function result:", data));

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
