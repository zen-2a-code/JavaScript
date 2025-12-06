// Objects (data + behavior bundles)
// JavaScript objects: key-value pairs that can also hold functions (methods).
// Access with dot or bracket notation (user.name or user["name"]); add/replace anytime.
// Use objects to group related data and the functions that work on that data.
const person = {
  name: "Stoyan",
  age: 29,
  describe() {
    return this.name + " is " + this.age;
  },
};
console.log("object describe():", person.describe());

// Objects are references: copying a reference points to the same object
const samePersonRef = person;
samePersonRef.age = 30; // changes person too, because both names point to one object
console.log("person after ref change:", person.age);

// Add or update properties any time
person.hobby = "guitar";
console.log("person with hobby:", person.hobby);

// Shallow clone to avoid shared reference (copies top level only)
const personCopy = { ...person };
personCopy.name = "Jordan";
console.log("person original name:", person.name, "| personCopy name:", personCopy.name);

// Deep copy options:
// - structuredClone(obj) (modern browsers/Node 17+) copies nested data (but not functions)
// - JSON.parse(JSON.stringify(obj)) also deep copies plain data, but loses functions, Dates, undefined
// Avoid mutating shared objects; prefer copies when you need immutability.

// Nested object example and access
const company = {
  name: "Tech Co",
  address: {
    city: "NYC",
    zip: "10001",
  },
  // Method using this to read sibling properties
  fullAddress() {
    return this.name + " in " + this.address.city;
  },
};
console.log("company city:", company.address.city);
console.log("company fullAddress():", company.fullAddress());
