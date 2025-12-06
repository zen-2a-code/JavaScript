// DOM and events basics (browser) — reference only, not meant to run in Node

// ----- Selecting elements -----
// const title = document.querySelector("h1");
// const items = document.querySelectorAll(".item"); // NodeList (can forEach)

// ----- Reading/writing text and attributes -----
// title.textContent = "New Title";
// title.setAttribute("data-role", "header");
// const role = title.getAttribute("data-role");

// ----- Creating and appending -----
// const btn = document.createElement("button");
// btn.textContent = "Click me";
// document.body.appendChild(btn);

// ----- Event listeners -----
// btn.addEventListener("click", (event) => {
//   event.preventDefault(); // stop default action (e.g., form submit)
//   console.log("Button clicked", event.target);
// });

// Bubbling vs capturing:
// - Events bubble up from child to parent by default; use event.stopPropagation() to halt bubbling.
// - To listen in capture phase, pass { capture: true } as the third arg.
// btn.addEventListener("click", handler, { capture: true });

// ----- Event delegation -----
// Listen on a parent and check event.target to handle many children efficiently.
// document.querySelector("ul").addEventListener("click", (event) => {
//   if (event.target.matches("li")) {
//     console.log("Clicked li:", event.target.textContent);
//   }
// });

// ----- Form input -----
// const input = document.querySelector("input");
// input.addEventListener("input", (e) => {
//   console.log("current value:", e.target.value);
// });

// ----- Fetch (browser) basic pattern -----
// fetch("/api/data")
//   .then((res) => {
//     if (!res.ok) throw new Error("Network error");
//     return res.json();
//   })
//   .then((data) => {
//     console.log("data:", data);
//   })
//   .catch((err) => {
//     console.error("fetch failed:", err.message);
//   });

// ----- Styling -----
// Element.style for quick changes; classList for adding/removing classes.
// title.style.color = "red";
// title.classList.add("highlight");

// ----- localStorage / sessionStorage -----
// Persist simple string data (key/value). Only stores strings; JSON.stringify/parse for objects.
// localStorage.setItem("token", "abc123");
// const token = localStorage.getItem("token");
// localStorage.removeItem("token");
// For session-only storage (clears when tab closes), use sessionStorage.

// ----- Simple fetch + render flow (outline) -----
// async function loadAndRender() {
//   const list = document.querySelector("#items");
//   list.textContent = "Loading...";
//   try {
//     const res = await fetch("/api/items");
//     if (!res.ok) throw new Error("Network error");
//     const data = await res.json();
//     list.innerHTML = data
//       .map((item) => `<li>${item.name}</li>`)
//       .join("");
//   } catch (err) {
//     list.textContent = "Error: " + err.message;
//   }
// }
// loadAndRender();
