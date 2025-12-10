// React / React Native fundamentals (super beginner-friendly)
// This file is comments + simple snippets; it is not meant to run directly.
// What is React? A library to build UIs with components (little functions that return UI).
// What is React Native? Same component ideas, but using native mobile components instead of HTML.
// Big ideas:
// - Components are just functions that return UI (JSX) — like small Lego blocks.
// - Props are the function arguments (one object) passed from parent to child; read-only inside the child.
// - State lives in components (useState/useReducer) and triggers a re-render when it changes.
// - Data flows down via props; children ask parents to change state via callbacks passed as props.
// - You compose small components to build larger UIs; each component can have its own state/props.
// - React Native swaps HTML tags for RN components (<View>, <Text>, <Button>, <TextInput>).
// - Modern React uses function components + hooks. Class components exist, but you can learn hooks first.
// - Mount/update/unmount: React mounts a component (first time), updates it when props/state change, and unmounts it when removed.
// How to read JSX: looks like HTML, but is JS; {} means "run JS here".
// JSX under the hood: compiled to plain JS (React.createElement calls). The browser/device never sees JSX text.
// Render cycle (big picture): component function runs -> returns JSX -> React draws it.
// If state changes, React runs the function again with the new state and updates the UI.
// Virtual DOM (tiny idea): React keeps a lightweight copy of the UI tree in memory and updates the real UI efficiently.
// You just describe "what the UI should look like"; React figures out the minimal changes.
// 10-year-old version: Components are tiny robots. Props are the lunch you hand them.
// State is the robot's own backpack. When state changes, the robot redraws its picture.
// Naming rule: component functions must start with a capital letter (e.g., Counter, App).
// Quick RN component cheat sheet: <View> like a div, <Text> for text, <Button> for simple button, <TextInput> for input,
// <ScrollView> for scrollable content, <FlatList> for long lists, <Image> to show pictures.
// Hot reload: both web dev servers and Expo reload your app when you save; great for fast feedback.
// How to design a component (recipe):
// 1) List props you need from parent (inputs). 2) List state you own (changes over time).
// 3) List event handlers (what happens on clicks/presses). 4) Side effects? Put in useEffect with correct deps.
// 5) Return JSX that uses those props/state. Keep it small; split if it feels big.

// ----- Tiny "Hello + Counter" (web) -----
// function App() {
//   const [name, setName] = React.useState("Alex");
//   const [count, setCount] = React.useState(0);
//   return (
//     <div>
//       <h1>Hello, {name}</h1>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount((c) => c + 1)}>Add one</button>
//       <input value={name} onChange={(e) => setName(e.target.value)} />
//     </div>
//   );
// }
// ReactDOM.render(<App />, document.getElementById("root"));

// ----- Tiny "Hello + Counter" (React Native) -----
// import React, { useState } from "react";
// import { View, Text, Button, TextInput } from "react-native";
// function App() {
//   const [name, setName] = useState("Alex");
//   const [count, setCount] = useState(0);
//   return (
//     <View>
//       <Text>Hello, {name}</Text>
//       <Text>Count: {count}</Text>
//       <Button title="Add one" onPress={() => setCount((c) => c + 1)} />
//       <TextInput value={name} onChangeText={setName} />
//     </View>
//   );
// }

// ----- Smallest possible web React counter (conceptual) -----
// function Counter() {
//   const [count, setCount] = React.useState(0);
//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Add one</button>
//     </div>
//   );
// }
// ReactDOM.render(<Counter />, document.getElementById("root"));

// ----- Function component (preferred in modern React/RN) -----
// Props are arguments; return JSX to render UI.
// In React Native, use <View>, <Text>, etc. instead of div/span.
/*
import React, { useState, useEffect } from "react"; // default import (React) + named imports (useState, useEffect) from the same package ({} means named imports)
import { View, Text, Button, StyleSheet } from "react-native"; // For web React omit this line (these are RN components, also named imports)
// Named imports: import { X, Y } from "pkg"; you must use the exported names (inside {}).
// Default import: import Anything from "pkg"; name it whatever you like (only one default per module).
// Exporting: export default function App() {} (import with any name), or export function App() {} and import with { App }.

function Counter({ start = 0 }) { // props are destructured: expect an object with key "start"
  // useState returns a pair: [currentValue, setterFn]. Calling setterFn triggers a re-render with new state.
  // Think: count is your current number, setCount is the button that updates it.
  const [count, setCount] = useState(start); // Array destructuring: left grabs the value, right grabs the setter React (useState) hands you.

  useEffect(() => {
    console.log("count changed:", count);         // side effect runs after render
  }, [count]);                                    // dependency array controls when effect runs:
  // [count] is just a normal JS array literal with one variable inside. It's not special syntax—same as const nums = [count];
  // The array lists values to watch. If any change since the last render, the effect runs.
  // [] -> run once after first render (nothing to watch).
  // [count] -> run after first render AND whenever count changes.
  // omit deps -> run after every render (rarely needed). Put all used state/props in the array.
  // Junior version: the array is your watchlist. Put every prop/state you READ inside the effect there.
  // If you read count inside the effect, add count to the array so React knows to rerun when it changes.
  // 10-year-old version: the array is a walkie-talkie list. You tell React, "Call me only when these friends change."

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
// - JSX must return one root element (wrap siblings in a fragment <>...</> or a parent).
// - Common pattern: parent passes data in props, child renders props and uses callbacks to ask for changes.
// - Capitalized tags are treated as components (Counter); lowercase tags are built-ins (div, View, Text).
// - Think: JSX is just another way to call functions that produce UI; {} lets you drop in variables/functions.
// - For a child to tell a parent something, pass a function down as a prop and call it.
// - 10-year-old version: JSX is story-telling with placeholders. {} is a blank you fill with a word or number.
// - Fragment shortcut: <>...</> when you don't want an extra wrapper element.
// - Re-render triggers: setState/useState setter, parent re-render (props changed), Context value change.
// - Keep components pure: given the same props/state, return the same JSX (no random mutations inside render).
// - Composition: you can nest components like Lego bricks: <Card><Button /></Card>.
// - 10-year-old version: build big toys by snapping smaller toy pieces together.
// - JSX rule: you can't put statements like if/for directly; use ternary/&& or map arrays to elements.
// - Dev mode note: React.StrictMode (web) can run components/effects twice in development to help catch bugs; not in production.
// - Debug tip: if something looks frozen, check state updates and keys; if an effect runs too often, check its deps array.
// - children prop: any JSX between <Card> ... </Card> is available as props.children inside Card; handy for reusable wrappers.
//   function Card({ children }) { return <View style={styles.card}>{children}</View>; }
//   <Card><Text>Hi</Text></Card> passes that Text as children.
// - Optional typing/prop checks: PropTypes (web) or TypeScript help catch wrong prop shapes early.
//   10-year-old version: give your robot a checklist of what props it expects so it can warn you if something is missing.

// ----- Props vs State -----
// Props: data passed in from parent; read-only inside the component (received as one object, often destructured).
// State: data owned by the component (useState/useReducer) that can change and cause re-render.
// One-way data flow: parents pass props down; children call callbacks (passed as props) to request changes.
// Example passing props: <Counter start={5} onDone={() => alert("done")} />
// In Counter, props is { start: 5, onDone: fn }, and you can destructure: function Counter({ start, onDone }) { ... }
// Tip: props are like function parameters; state is like a variable that remembers its value between renders.
// Mental picture: parent controls the data, child uses it and calls functions from props to ask for updates.
// Props are read-only; changing them inside the child does nothing. Ask a parent to change its state instead.
// 10-year-old version: Parent says, "Here is your lunch (props)." Child can eat it, but can't change what was packed.
// Child can shout back "please pack more snacks!" via a callback to ask the parent to change future lunches (state lives up there).
// Avoid copying props into state unless you truly need a local, editable copy; derive from props in render when possible.
// Tiny parent/child example:
// function Parent() {
//   const [count, setCount] = useState(0);
//   return <Child count={count} onAdd={() => setCount(count + 1)} />;
// }
// function Child({ count, onAdd }) {
//   return (
//     <View>
//       <Text>Count from parent: {count}</Text>
//       <Button title="Add" onPress={onAdd} />
//     </View>
//   );
// }

// ----- useState refresher -----
// const [value, setValue] = useState(initialValue);
// - value: the current state
// - setValue(newVal) or setValue((prev) => newValFromPrev): updates state and reruns the component
// - 10-year-old version: value is what's in your backpack; setValue is how you swap items and redraw your picture.
// - Default props pair well with destructuring: function Counter({ start = 0 }) { const [count, setCount] = useState(start); }
// - Multiple pieces of state are fine: const [name, setName] = useState("Alex"); const [age, setAge] = useState(10);
// - When state updates depend on the previous value, prefer the updater form: setCount((prev) => prev + 1).
// - Alternative: useReducer for more complex state updates (like a mini Redux inside a component):
//   const [state, dispatch] = useReducer((state, action) => {
//     if (action.type === "increment") return { ...state, count: state.count + 1 };
//     return state;
//   }, { count: 0 });
//   dispatch({ type: "increment" });
//   10-year-old version: useReducer is a rulebook; dispatch is how you shout which rule to apply.
// - Updating object/array state: make a new copy (spread) instead of mutating:
//   setUser((prev) => ({ ...prev, name: "Sam" })); setItems((prev) => [...prev, "new item"]);
//   10-year-old version: make a new drawing instead of scribbling on the old one.

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
// Keys rule of thumb: use an id from your data, not the array index, so React can track items reliably.
// 10-year-old version: keys are name tags on list items so React knows who moved where.
// Key placement: put key on the top-most element returned inside map, not on the fragment/wrapper unless it's the wrapper.

// ----- Conditional rendering -----
// Use && for simple conditions or ternary for either/or.
/*
{isLoading ? <Text>Loading...</Text> : <Text>Data ready</Text>}
{error && <Text style={{ color: "red" }}>{error}</Text>}
*/
// 10-year-old version: use ? : to say "if this, show that, else show something else."
// Return null to render nothing: if (!show) return null;

// ----- Event handlers -----
// Web: onClick, onChange; RN: onPress (Button/Touchable), onChangeText (TextInput).
// Always pass a function, not the result of a function call.
/*
<Button title="Save" onPress={() => saveItem(id)} />
*/
// 10-year-old version: onPress/onClick expects "what to do when clicked" (a function), not the result of doing it now.
// Common slip: onPress={saveItem(id)} runs immediately; correct is onPress={() => saveItem(id)} or onPress={saveItem} if no args.
// Web tip: className="btn" to add CSS classes; RN tip: style={{ padding: 8 }} passes a JS object for style.
// Accessibility: web uses aria-label/aria-* and semantic elements; RN uses accessible={true} and accessibilityLabel on buttons/text.

// ----- Controlled inputs (web) vs RN TextInput -----
/*
// Web example:
const [value, setValue] = useState("");
<input value={value} onChange={(e) => setValue(e.target.value)} />;

// React Native:
const [value, setValue] = useState("");
<TextInput value={value} onChangeText={setValue} />;
*/
// Tiny form pattern (web):
// const [email, setEmail] = useState("");
// const handleSubmit = (e) => { e.preventDefault(); console.log(email); };
// return (<form onSubmit={handleSubmit}>
//   <input value={email} onChange={(e) => setEmail(e.target.value)} />
//   <button type="submit">Send</button>
// </form>);
// 10-year-old version: keep what you type in state, so the screen and your data stay in sync.

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
// - Why deps matter: React remembers the last values; it reruns the effect only if watched values change.
// - 10-year-old version: write down which toys (variables) you care about; React checks if any toy changed before rerunning the chore.
// Rules of hooks (critical): only call hooks at the top level of a component or custom hook;
// never inside loops/conditions; only from React function components or custom hooks.
// 10-year-old version: hooks are special buttons; you must press them in the same order every time.
// - Cleanup (return () => {...}) runs before unmount and before the next effect run to avoid leaks.

// ----- Custom hooks (your own reusable hooks) -----
// Just a function that starts with "use" and calls other hooks. Great for sharing logic.
// Example:
// function useWindowWidth() {
//   const [width, setWidth] = useState(window.innerWidth);
//   useEffect(() => {
//     const onResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize); // cleanup
//   }, []);
//   return width;
// }
// function Component() {
//   const width = useWindowWidth();
//   return <p>Width: {width}</p>;
// }
// 10-year-old version: if you repeat the same hook steps, pack them into a mini helper that starts with "use".

// ----- Context (avoid deep prop drilling) -----
// Create a Context and wrap your tree; use useContext to read values.
/*
const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}
function Child() {
  const theme = React.useContext(ThemeContext);
  return <Text>Current theme: {theme}</Text>;
}
*/

// ----- Navigation (React Native) -----
// Typically use a library like @react-navigation/native.
// Keep navigation logic in a navigator and pass screens as components.
// 10-year-old version: think of a stack of screens you can push and pop.
// React Native fact: there is no DOM/window/document; use RN APIs (View, TextInput, etc.) and libraries for device features.
// Tiny RN stack example (pseudo):
// const Stack = createNativeStackNavigator();
// function App() { return (
//   <NavigationContainer>
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Details" component={DetailsScreen} />
//     </Stack.Navigator>
//   </NavigationContainer>
// );}
// HomeScreen gets a navigation prop: navigation.navigate("Details");
// Web routing: react-router-dom is common; use <Routes><Route path="/" element={<Home />}/></Routes> and <Link to="/details">Go</Link>.

// ----- Styling -----
// Web React: CSS/SCSS, CSS modules, styled-components, inline style objects.
// React Native: StyleSheet.create or inline style objects; uses Flexbox; no traditional CSS classes.
// RN style is JS objects (camelCase), e.g., { marginTop: 8, flexDirection: "row" }.
// Web vs RN styling: web uses className + CSS files; RN uses JS objects and Flexbox everywhere.
// 10-year-old version: on the web you paint with CSS files; in RN you hand React a JS object describing sizes/colors.
// RN pro tip: for long lists use FlatList instead of manually mapping to many <View>s (better performance).
// Web tip: avoid inline objects in big lists unless memoized; they create new references every render.
// RN platform bits: SafeAreaView helps avoid notches; Platform.OS lets you branch for ios/android; images use <Image source={{ uri }}> or require().
// RN style quirks: default flexDirection is column (web defaults row); no px units, numbers are density-independent pixels.
// RN StyleSheet.create({ ... }) can catch typos (warns on unknown style keys) and can give minor perf wins.
// RN touchables: Button is basic; <Pressable> or <TouchableOpacity> give more control over style/feedback.
// RN StatusBar: <StatusBar barStyle="light-content" /> lets you style the top bar on iOS/Android.
// RN style arrays let you combine styles: <View style={[styles.box, isActive && styles.active]} /> (falsy entries are ignored).
// RN images need sizes: <Image source={{ uri }} style={{ width: 100, height: 100 }} />.
// RN FlatList tiny example:
// <FlatList data={todos} keyExtractor={(item) => String(item.id)}
//   renderItem={({ item }) => <Text>{item.text}</Text>} />
// FlatList handles scrolling + virtualization; always give a stable keyExtractor.
// RN Text rule: only <Text> can render text. Wrap strings inside <Text>; you cannot put raw text inside <View>.
// Flexbox quickie: justifyContent controls main axis, alignItems controls cross axis; row vs column flips the axes.
// 10-year-old version: justify is how you spread kids along the line; align is how you line them up across the line.
// ScrollView vs FlatList: ScrollView is fine for small content; FlatList is for large/unknown-size lists (better memory/perf).
// Simple animation starter (web): CSS transition on hover/click. Simple RN starter: wrap content in <Pressable style={({ pressed }) => pressed && { opacity: 0.5 }}> to give feedback.
// Tiny animation examples:
// Web (CSS transition): .btn { transition: transform 150ms ease; } .btn:hover { transform: scale(1.03); }
// Web (JS + framer-motion idea): <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.4 }} />
// RN (Animated API basic fade):
// const opacity = useRef(new Animated.Value(0)).current;
// useEffect(() => { Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }).start(); }, []);
// return <Animated.View style={{ opacity }}><Text>Hello</Text></Animated.View>;
// RN (LayoutAnimation for simple layout changes):
// import { LayoutAnimation } from "react-native";
// const toggle = () => { LayoutAnimation.easeInEaseOut(); setOpen((o) => !o); };
// 18-year-old version: start with CSS transitions or Pressable feedback; move to Animated/Framer Motion when you need smoother control.

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
// Pattern for loading + error state (simplified):
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null);
// const [data, setData] = useState([]);
// const load = async () => {
//   try { setLoading(true); setError(null);
//     const res = await fetch("https://example.com/api");
//     const json = await res.json();
//     setData(json);
//   } catch (err) { setError(err.message); }
//   finally { setLoading(false); }
// };
// 10-year-old version: flip a "loading" sign while you wait, stash the package in data, write down the error if it broke.
// Tiny fetch + render idea (web/RN similar):
// useEffect(() => { load(); }, []); // run once on mount
// if (loading) return <Text>Loading...</Text>;
// if (error) return <Text>Error: {error}</Text>;
// return data.map((item) => <Text key={item.id}>{item.name}</Text>);
// 10-year-old version: show "loading" sign, then either show the package list or the "oops" note.

// ----- State vs ref quick contrast -----
// useState: changing it causes a re-render (good for UI values).
// useRef: changing it does NOT re-render (good for timer IDs, previous values, DOM/RN node handles).
// 10-year-old version: state is a whiteboard everyone sees; ref is a secret note only you read.
// What to put in useEffect vs an event: useEffect for work that should run because the component showed up or changed;
// event handlers for user actions (clicks, submits).
// 10-year-old version: useEffect is like chores you do after the room appears or changes; event handlers are reactions to button presses.

// ----- State updates are async-ish -----
// setState/useState updates are batched; don't rely on the old value immediately after calling setState.
// Use the updater form when deriving from previous state:
// setCount((prev) => prev + 1);
// 10-year-old version: when you press setCount, React queues it and updates soon; use the updater form if you need the old value.

// ----- Controlled vs uncontrolled inputs -----
// Controlled: value comes from state and updates via onChange/onChangeText (shown above).
// Uncontrolled: use refs and read value when needed (less common in React patterns).
// Rule of thumb: default to controlled inputs; they keep UI in sync with state. RN uses onChangeText for TextInput.
// 10-year-old version: keep the input value in state so the UI and your data are always matching.

// ----- Refs -----
// useRef holds a mutable value that persists across renders without causing re-renders.
// Common uses: access DOM nodes (web) or store instance-like data.
/*
import { useRef, useEffect } from "react";

function InputFocus() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return <input ref={inputRef} />;
}
*/
// RN ref example (no DOM, but TextInput accepts ref):
// const inputRef = useRef(null);
// <TextInput ref={inputRef} />;
// 10-year-old version: a ref is a sticky note where you can store a value that shouldn't trigger a redraw.
// Web vs RN: web refs often point to DOM nodes; RN refs often point to components (e.g., TextInput) for focus/imperative calls.

// ----- Performance basics -----
// - Avoid creating new inline objects/arrays inside heavy lists (use memoization if needed).
// - useMemo/useCallback can help avoid unnecessary renders, but start simple.
// - If it's fast enough and simple, prefer clarity over premature optimization.
// - Think "first make it work, then make it fast if needed."
// - Example of useMemo to cache a derived value:
//   const total = useMemo(() => items.reduce((sum, n) => sum + n, 0), [items]);
//   It recalculates only when items changes.
// - Common pitfall: mutating state directly (state.push). Instead, make a copy: setItems((prev) => [...prev, newItem]).
// - Keys: always add key to list items; avoid using index if the list can reorder (use stable ids).
// - Common mistakes: missing key on list, mutating state, calling hooks in conditions, forgetting deps in useEffect.
// - React Native extra: prefer FlatList for large lists, and avoid expensive work in render; move it to useMemo/useCallback.
// - React.memo can wrap a pure component to skip re-render if props didn't change (optimization, optional).

// ----- Error handling -----
// - Wrap risky parts with try/catch inside effects or event handlers.
// - For rendering errors, use an Error Boundary (class component with componentDidCatch) in web React; RN supports it too.
// 10-year-old version: put a safety net around parts that might break so the whole app doesn't crash.

// ----- RN quick environment tips -----
// - Run on device/emulator: use Expo Go app (scan QR) or a simulator/emulator started from Metro CLI.
// - Metro bundler is the server that builds your JS for RN; usually starts with npx expo start or npx react-native start.
// - Permissions (camera/location/etc.): use platform APIs (e.g., expo-camera or react-native-permissions) and request at runtime.
// - Assets: use require("./image.png") for bundled images; remote images use <Image source={{ uri }} />.
// - Debugging RN: shake device or press d in Metro terminal to open Dev Menu; enable Remote JS Debug/React DevTools; console.log works.
// - Layout helpers: KeyboardAvoidingView can move content above the keyboard; useColorScheme() can tell you dark vs light mode.

// ----- Testing -----
// Use React Testing Library for components (web), and @testing-library/react-native for RN.
// 10-year-old version: pretend to click buttons in tests and check the text changes.

// ----- Quick start (how to try this) -----
// Web React (fastest): npx create-vite@latest my-app --template react; npm install; npm run dev.
// Older but common: npx create-react-app my-app; npm start.
// React Native (easiest path): npx create-expo-app MyApp; cd MyApp; npm start (or expo start).
// Expo gives you a QR code to run on a phone (no native build setup needed to start).
// Add React DevTools browser extension to inspect props/state. In Expo, use React DevTools or Flipper to inspect RN apps.
// Debugging tip: console.log props/state inside components; use React DevTools to inspect component tree.
// Bottom-line mental model for a 10-year-old:
// - A component is a robot drawing a picture. Props are the lunch you hand it; state is its own backpack.
// - When the backpack changes, the robot redraws. When parents give new lunch, it redraws.
// - JSX is the drawing instructions with blanks {}; events are what happens when you tap/click things.
// - If something breaks, add console.log, check keys, and look at the deps array in useEffect.
// Quick checklist before shipping:
// - Unique keys on list items? - No state mutation? - Hooks at top-level only? - useEffect deps correct?
// - Inputs controlled? - Errors handled? - For RN: using SafeAreaView/FlatList where needed?
// - Navigation: RN uses react-navigation; web often uses react-router-dom (<Link>, <Routes>).
