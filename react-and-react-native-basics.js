// React / React Native fundamentals (junior-friendly reference)
// This file is comments + simple snippets; it is not meant to run directly.

// ----- Function component (preferred in modern React/RN) -----
// Props are arguments; return JSX to render UI.
// In React Native, use <View>, <Text>, etc. instead of div/span.
/*
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native"; // For web React omit this line

function Counter({ start = 0 }) {
  const [count, setCount] = useState(start);      // state hook

  useEffect(() => {
    console.log("count changed:", count);         // side effect runs after render
  }, [count]);                                    // dependency array: run when count changes

  return (
    <View style={styles.box}>
      <Text>Count: {count}</Text>                 // JSX expression with {}
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 16 },
});
*/

// ----- JSX essentials -----
// - Looks like HTML but compiles to React.createElement calls.
// - Attributes use camelCase: onClick, className (web), onPress (RN Button), style={...}.
// - Wrap expressions in {}: <Text>{count}</Text>.

// ----- Props vs State -----
// Props: data passed in from parent; read-only inside the component.
// State: data owned by the component (useState/useReducer) that can change and cause re-render.

// ----- Lists and keys -----
// Always provide a stable key for list items to help React track elements.
/*
const todos = [{ id: 1, text: "Learn React" }, { id: 2, text: "Build app" }];
return (
  <View>
    {todos.map((item) => (
      <Text key={item.id}>{item.text}</Text>
    ))}
  </View>
);
*/

// ----- Conditional rendering -----
// Use && for simple conditions or ternary for either/or.
/*
{isLoading ? <Text>Loading...</Text> : <Text>Data ready</Text>}
{error && <Text style={{ color: "red" }}>{error}</Text>}
*/

// ----- Event handlers -----
// Web: onClick, onChange; RN: onPress (Button/Touchable), onChangeText (TextInput).
// Always pass a function, not the result of a function call.
/*
<Button title="Save" onPress={() => saveItem(id)} />
*/

// ----- Controlled inputs (web) vs RN TextInput -----
/*
// Web example:
const [value, setValue] = useState("");
<input value={value} onChange={(e) => setValue(e.target.value)} />;

// React Native:
const [value, setValue] = useState("");
<TextInput value={value} onChangeText={setValue} />;
*/

// ----- Lifting state up -----
// Keep shared state in the closest common parent; pass down via props.
// If prop drilling gets deep, consider Context for global/shared values.

// ----- useEffect gotchas -----
// - Include dependencies in the array to avoid stale values.
// - Cleanup subscriptions/timers in the return function.
/*
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id); // cleanup
}, []); // empty array => run once on mount
*/

// ----- Navigation (React Native) -----
// Typically use a library like @react-navigation/native.
// Keep navigation logic in a navigator and pass screens as components.

// ----- Styling -----
// Web React: CSS/SCSS, CSS modules, styled-components, inline style objects.
// React Native: StyleSheet.create or inline style objects; uses Flexbox; no traditional CSS classes.

// ----- Data fetching -----
// Use fetch/axios inside useEffect (or event handlers) and store results in state.
/*
useEffect(() => {
  let mounted = true;
  fetch("https://example.com/api")
    .then((res) => res.json())
    .then((data) => mounted && setData(data))
    .catch((err) => setError(err.message));
  return () => { mounted = false; };
}, []);
*/

// ----- Performance basics -----
// - Avoid creating new inline objects/arrays inside heavy lists (use memoization if needed).
// - useMemo/useCallback can help avoid unnecessary renders, but start simple.

// ----- Testing -----
// Use React Testing Library for components (web), and @testing-library/react-native for RN.
