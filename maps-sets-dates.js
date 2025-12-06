// Maps, Sets, and Dates (junior-friendly)

// ----- Map -----
// Map stores key-value pairs; keys can be any type (objects, numbers, strings).
const userMap = new Map();
const userObjKey = { id: 1 };
userMap.set("name", "Alex");
userMap.set(userObjKey, { role: "admin" });
console.log("map get by string key:", userMap.get("name")); // "Alex"
console.log("map get by object key:", userMap.get(userObjKey)); // { role: "admin" }
console.log("map has 'name'?", userMap.has("name")); // true
userMap.delete("name"); // remove by key
console.log("map size:", userMap.size);

// Iterate maps: entries(), keys(), values()
for (const [key, value] of userMap.entries()) {
  console.log("map entry:", key, value);
}

// ----- Set -----
// Set stores unique values (no duplicates).
const idSet = new Set([1, 2, 2, 3]); // duplicates are ignored
idSet.add(4);
console.log("set has 2?", idSet.has(2)); // true
idSet.delete(1);
console.log("set size:", idSet.size);
for (const id of idSet) {
  console.log("set value:", id);
}

// ----- WeakMap / WeakSet (brief mention) -----
// They hold weak references to objects (garbage-collected automatically).
// Keys (WeakMap) or values (WeakSet) must be objects; you cannot iterate them.

// ----- Date basics -----
const now = new Date();
console.log("current date/time:", now.toString());
console.log("ISO format:", now.toISOString());
console.log("year/month/day:", now.getFullYear(), now.getMonth() + 1, now.getDate());

// Create a specific date: months are 0-based (0 = January)
const birthday = new Date(2000, 5, 15); // June 15, 2000
console.log("birthday:", birthday.toDateString());

// Timestamps: milliseconds since Jan 1, 1970 UTC
const timestamp = Date.now();
console.log("timestamp now:", timestamp);

// Simple time difference (in seconds)
const start = Date.now();
setTimeout(() => {
  const end = Date.now();
  console.log("elapsed seconds:", (end - start) / 1000);
}, 500);

// ----- Formatting dates and time zones -----
// How to store: keep UTC in the database (e.g., use ISO strings from date.toISOString()).
// Why: UTC is a neutral baseline; you can safely convert to any user's local time when displaying.
// How to display: create a Date from the stored ISO, then use toLocaleString / toLocaleDateString /
// toLocaleTimeString with the user's locale and options (hour12: false for 24h, etc).

// Example: Bulgarian locale (bg-BG) dd.MM.yyyy and 24-hour time.
const bulgarianDate = now.toLocaleDateString("bg-BG"); // e.g., "13.12.2025"
const bulgarianTime = now.toLocaleTimeString("bg-BG", { hour12: false }); // 24-hour
console.log("Bulgarian date:", bulgarianDate, "| Bulgarian time:", bulgarianTime);

// Popular formats/locales:
console.log("US date (en-US):", now.toLocaleDateString("en-US")); // MM/DD/YYYY
console.log("UK date (en-GB):", now.toLocaleDateString("en-GB")); // DD/MM/YYYY
console.log(
  "ISO-like with options:",
  now.toLocaleString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
);

// Custom format example (pad manually) dd.MM.yyyy HH:mm:ss
function pad2(n) {
  return String(n).padStart(2, "0");
}
function formatBG(date) {
  const d = pad2(date.getDate());
  const m = pad2(date.getMonth() + 1);
  const y = date.getFullYear();
  const hh = pad2(date.getHours());
  const mm = pad2(date.getMinutes());
  const ss = pad2(date.getSeconds());
  return `${d}.${m}.${y} ${hh}:${mm}:${ss}`;
}
console.log("Custom BG format:", formatBG(now));

// Parsing ISO (UTC) and viewing in local time:
const isoString = now.toISOString(); // store/send this to DB
const parsedLocal = new Date(isoString); // JS dates are in local tz when you view components
console.log("Stored ISO (UTC):", isoString);
console.log("Viewed locally with toString():", parsedLocal.toString());

// Convert stored UTC to a specific locale/timezone for display:
const utcFromDb = isoString; // pretend this came from DB
const localFromDb = new Date(utcFromDb); // Date interprets ISO as UTC, shows in local tz
console.log("Local view from stored UTC:", localFromDb.toString());
console.log(
  "Bulgarian view from stored UTC:",
  new Date(utcFromDb).toLocaleString("bg-BG", { hour12: false })
);
console.log(
  "US view from stored UTC:",
  new Date(utcFromDb).toLocaleString("en-US", { hour12: true })
);

// Force a specific time zone when formatting (useful for users in different regions).
// Example: show time in Europe/Sofia regardless of where the code runs.
console.log(
  "Europe/Sofia time:",
  new Date(utcFromDb).toLocaleString("bg-BG", {
    timeZone: "Europe/Sofia",
    hour12: false,
  })
);

// Timestamps and constructing Dates:
// - Date.now() -> ms since Jan 1, 1970 UTC
// - new Date(ms) -> build a Date from a timestamp
const ts = Date.now();
const fromTimestamp = new Date(ts);
console.log("timestamp:", ts, "| from timestamp:", fromTimestamp.toISOString());
