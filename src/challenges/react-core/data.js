import React from 'react';

// Journey-style React Core challenges (React 18 concepts)
export const reactCoreChallenges = [
  {
    id: 'render-basics',
    title: 'Render & Re-Render Basics',
    difficulty: 'easy',
    pLevel: 'p0',
    expectedTime: '15m',
    category: 'rendering',
    slug: 'render-and-rerender-basics',
    description: `
### Why Re-Renders Happen
React re-renders a component when:
1. **State changes**: \`setState\` is called.
2. **Props change**: A parent passes new props.
3. **Parent re-renders**: By default, children re-render too.
4. **Context changes**: Consumed context updates.

### Key Concepts
- **Async State Updates**: \`setState\` doesn't update immediately. React schedules it.
- **Batching**: React 18 batches multiple state updates into a single re-render for performance (even in promises/timeouts).
- **Functional Updates**: Use \`setCount(c => c + 1)\` when the new state depends on the old state to avoid stale closures.

### Instructions
1. Observe the console logs to see when renders happen.
2. Click "+1" multiple times. Notice it might use a "stale" count if not handled carefully in closures (though here it's direct).
3. Click "+2". Notice that despite two \`setCount\` calls, the component only renders **once** due to batching.
4. Try breaking batching (optional advanced): Wrap updates in \`flushSync\` (rarely needed).
`,
    initialCode: `
export default function App() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    console.log("render -> count:", count, "name:", name);
  });

  const addTwo = () => {
    setCount(c => c + 1);
    setCount(c => c + 1); // batched in React 18
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Render & Re-Render Basics</h2>
      <p>Updates are batched. Functional setState reads the freshest value.</p>
      <button onClick={() => setCount(count + 1)}>+1 (uses stale count if async)</button>
      <button onClick={addTwo} style={{ marginLeft: 8 }}>+2 (functional)</button>
      <div style={{ marginTop: 12 }}>Count: {count}</div>
      <input
        placeholder="type your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginTop: 12 }}
      />
    </div>
  );
}
`
  },
  {
    id: 'effect-layout',
    title: 'Effects vs Layout Effects',
    difficulty: 'medium',
    pLevel: 'p1',
    expectedTime: '20m',
    category: 'effects',
    slug: 'effects-vs-layout-effects',
    description: `
### useEffect vs useLayoutEffect
- **useEffect**: Runs **asynchronously** after the render is painted to the screen. Use this for data fetching, subscriptions, or timers.
- **useLayoutEffect**: Runs **synchronously** after DOM mutations but *before* the browser paints. Use this for measuring DOM elements or preventing visual flickers (e.g., positioning a tooltip).

### What Happens Here?
1. **State Change**: \`color\` changes.
2. **Render**: React updates the DOM (div background becomes new color).
3. **useLayoutEffect**: Runs *immediately*. We measure or mutate DOM here (adding a border). The user sees the final state (color + border) all at once.
4. **Paint**: Browser paints the screen.
5. **useEffect**: Runs *after* paint. Good for logging or non-blocking side effects.

### Instructions
1. Toggle the color. Watch the console order.
2. Notice there is no "flicker" of the border appearing late, because \`useLayoutEffect\` blocks the paint.
3. Try changing \`useLayoutEffect\` to \`useEffect\` and see if you can spot a flicker (might be too fast on simple DOM, but conceptually important).
`,
    initialCode: `
export default function App() {
  const boxRef = React.useRef(null);
  const [color, setColor] = React.useState("skyblue");

  React.useLayoutEffect(() => {
    if (boxRef.current) {
      // This runs before the user sees the update
      boxRef.current.style.border = "5px solid hotpink";
    }
    return () => {
      // Cleanup runs synchronously too
      if (boxRef.current) {
        boxRef.current.style.border = "1px solid #ccc";
      }
    };
  }, [color]);

  React.useEffect(() => {
    console.log("useEffect runs AFTER paint. Color:", color);
  }, [color]);

  return (
    <div style={{ padding: 16 }}>
      <h2>useEffect vs useLayoutEffect</h2>
      <p>Layout effect runs before paint; effect runs after paint.</p>
      <button onClick={() => setColor(c => c === "skyblue" ? "khaki" : "skyblue")}>
        Toggle Color
      </button>
      <div
        ref={boxRef}
        style={{
          marginTop: 16,
          width: 180,
          height: 100,
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: "background 200ms"
        }}
      >
        Box
      </div>
    </div>
  );
}
`
  },
  {
    id: 'memoization',
    title: 'Memoization: useMemo & useCallback',
    difficulty: 'medium',
    pLevel: 'p1',
    expectedTime: '25m',
    category: 'performance',
    slug: 'memoization-usememo-usecallback',
    description: `
### Optimizing Performance
React is fast, but expensive calculations or frequent re-renders of heavy sub-components can slow it down.

### Tools
1. **React.memo**: Higher-Order Component (HOC) that skips re-rendering a child if its props haven't changed.
2. **useMemo**: Caches the *result* of a calculation. Re-runs only if dependencies change.
3. **useCallback**: Caches a *function definition*. Essential when passing functions to \`React.memo\` components so they don't see a "new" function every render.

### Instructions
1. Type in the filter input. Notice the parent re-renders (changing state).
2. **Without Memo**: The \`List\` component would re-render every time, even if items didn't change.
3. **With Memo**: We use \`React.memo(List)\`. But we must also ensure \`items\` (array) and \`onSelect\` (function) are stable.
4. Verify: \`filtered\` is wrapped in \`useMemo\`. \`handleSelect\` is wrapped in \`useCallback\`.
5. Check the console: "List render" should only appear when the *list content* actually changes, not just when you type unrelated state (unless it affects the filter).
`,
    initialCode: `
// React.memo prevents re-render if props (items, onSelect) are unchanged
const List = React.memo(function List({ items, onSelect }) {
  console.log("List render (items count):", items.length);
  return (
    <ul>
      {items.map((it) => (
        <li 
          key={it} 
          onClick={() => onSelect(it)}
          style={{ cursor: 'pointer', padding: '4px 0' }}
        >
          {it}
        </li>
      ))}
    </ul>
  );
});

export default function App() {
  const [filter, setFilter] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  
  // Stable data source
  const data = React.useMemo(() => [
    "React", "Redux", "React Router", "TanStack Query", "Vite", "Next.js", "Remix"
  ], []);

  // 1. Expensive calculation memoized
  const filtered = React.useMemo(
    () => {
      console.log("Filtering items...");
      return data.filter(d => d.toLowerCase().includes(filter.toLowerCase()));
    },
    [data, filter]
  );

  // 2. Function definition memoized (stable reference)
  const handleSelect = React.useCallback((item) => {
    setSelected(item);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Memoization</h2>
      <input
        placeholder="Filter list..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ padding: 8, width: '100%', boxSizing: 'border-box' }}
      />
      <div style={{ margin: '12px 0', color: '#888' }}>
        Check console for render logs.
      </div>
      <List items={filtered} onSelect={handleSelect} />
      <div style={{ marginTop: 12, fontWeight: 'bold' }}>
        Selected: {selected || "None"}
      </div>
    </div>
  );
}
`
  },
  {
    id: 'refs-and-dom',
    title: 'Refs, DOM, and State',
    difficulty: 'easy',
    pLevel: 'p1',
    expectedTime: '15m',
    category: 'refs',
    slug: 'refs-and-dom',
    description: `
### Refs vs State
- **State**: Triggers a re-render when updated. Use for data that affects the UI.
- **Ref**: Persists values between renders *without* triggering a re-render. Use for mutable values (timers, previous props) or direct DOM access.

### DOM Access
- Pass \`ref={myRef}\` to a JSX element. React sets \`myRef.current\` to the DOM node after mount.
- Use this to manage focus, scroll position, or integrate with 3rd-party non-React libraries.

### Instructions
1. Type in the input. This updates \`state\` (re-renders component). We count renders using a \`ref\`.
2. Click "Focus input". This accesses the DOM directly via \`ref\`.
3. Notice that updating \`renders.current\` doesn't cause an infinite loop of re-renders because refs don't trigger updates.
`,
    initialCode: `
export default function App() {
  const renders = React.useRef(0);
  const inputRef = React.useRef(null);
  const [value, setValue] = React.useState("");

  // Track render count without triggering another render
  renders.current += 1;

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = '#f0f8ff';
      setTimeout(() => {
        if (inputRef.current) inputRef.current.style.backgroundColor = '';
      }, 500);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Refs vs State</h2>
      <p>Component Renders: <strong>{renders.current}</strong></p>
      
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to trigger render..."
          style={{ padding: 8 }}
        />
        <button onClick={focusInput}>
          Focus Input (Ref)
        </button>
      </div>
      
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        Typing updates state (render++). Clicking focus uses ref (no render).
      </p>
    </div>
  );
}
`
  },
  {
    id: 'fragments-keys',
    title: 'Fragments & Keys',
    difficulty: 'easy',
    pLevel: 'p2',
    expectedTime: '15m',
    category: 'rendering',
    slug: 'fragments-and-keys',
    description: `
### Fragments (<>...</>)
- Group multiple elements without adding an extra node (like \`<div>\`) to the DOM.
- Essential for valid HTML structures (e.g., \`<tr>\` inside \`<table>\`, \`<dt>/<dd>\` inside \`<dl>\`).

### Keys
- A unique string identifying a list item among its siblings.
- **Why?** React uses keys to diff the Virtual DOM. Stable keys minimize DOM mutations.
- **Don't use index as key** if the list order can change (sort/filter/insert), as it leads to bugs with component state or focus.

### Instructions
1. Observe the \`Row\` component. It returns two elements (\`dt\` and \`dd\`). We use a Fragment so we don't break the flex/grid layout of the parent.
2. Click "Add Item". A new item is prepended.
3. Because we use \`item.id\` (stable) instead of index, React knows exactly which item is new and preserves the state of existing DOM nodes if they had any.
`,
    initialCode: `
const Row = ({ label, value }) => (
  // Fragment lets us return two root elements
  <>
    <div style={{ fontWeight: 'bold' }}>{label}:</div>
    <div>{value}</div>
  </>
);

export default function App() {
  const [items, setItems] = React.useState([
    { id: 1, label: "Framework", value: "React" },
    { id: 2, label: "Bundler", value: "Vite" },
  ]);

  const addItem = () => {
    const newItem = { 
      id: Date.now(), 
      label: "New Item", 
      value: new Date().toLocaleTimeString() 
    };
    // Prepend to show importance of keys
    setItems([newItem, ...items]);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Fragments & Keys</h2>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "120px 1fr", 
        gap: "8px",
        border: "1px solid #ddd",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16
      }}>
        {items.map((item) => (
          // Use stable ID as key, not index!
          <Row key={item.id} label={item.label} value={item.value} />
        ))}
      </div>

      <button onClick={addItem}>
        Add Item (Prepend)
      </button>
    </div>
  );
}
`
  },
  {
    id: 'concurrent',
    title: 'Concurrent Updates (startTransition)',
    difficulty: 'medium',
    pLevel: 'p2',
    expectedTime: '25m',
    category: 'concurrency',
    slug: 'concurrent-updates',
    description: `
### Concurrency in React 18
React 18 introduces the ability to pause, resume, or prioritize rendering work.

### useTransition / startTransition
- Marks a state update as **non-urgent** (transition).
- **Urgent updates** (typing in input) interrupt **non-urgent updates** (rendering a huge list).
- This keeps the UI responsive (typing feels smooth) even if the filtering logic is heavy.

### useDeferredValue
- Similar concept: defers the *value* passed to a slow component until the urgent updates are done.

### Instructions
1. We have a dummy list of 5,000 items. Filtering it is expensive.
2. Without \`startTransition\`, typing would feel laggy because React blocks the UI until the list renders.
3. With \`startTransition\`, React updates the input *immediately* (urgent), then renders the filtered list in the background.
4. Observe the "Updating list..." pending state which appears while the background transition processes.
`,
    initialCode: `
// Generate a large dataset
const bigList = Array.from({ length: 5000 }, (_, i) => "Item " + (i + 1));

export default function App() {
  const [inputVal, setInputVal] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const handleChange = (e) => {
    const val = e.target.value;
    
    // 1. Urgent update: Input field
    setInputVal(val);
    
    // 2. Transition update: Filter list (can be interrupted)
    startTransition(() => {
      setQuery(val);
    });
  };

  // Expensive filtering logic
  const filtered = React.useMemo(() => {
    return bigList.filter((x) => x.includes(query));
  }, [query]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Concurrent Updates</h2>
      <p>Type fast! The input stays responsive even though the list is huge.</p>
      
      <input
        value={inputVal}
        onChange={handleChange}
        placeholder="Type '99' to filter..."
        style={{ 
          padding: 8, 
          width: '100%', 
          fontSize: '1.1rem',
          marginBottom: 8
        }}
      />
      
      {isPending && (
        <div style={{ color: "orange", fontWeight: 'bold' }}>
          Rendering list in background...
        </div>
      )}
      
      <div style={{ 
        height: 200, 
        overflow: "auto", 
        border: "1px solid #eee",
        borderRadius: 4
      }}>
        {filtered.map((item) => (
          <div key={item} style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0' }}>
            {item}
          </div>
        ))}
        {filtered.length === 0 && <div style={{ padding: 8 }}>No matches</div>}
      </div>
    </div>
  );
}
`
  },
];

export default reactCoreChallenges;
