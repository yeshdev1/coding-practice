# Frontend React Coding Challenge Questions & Evaluation Criteria

This document contains a curated list of React coding challenges categorized by difficulty, followed by a guide on how frontend interviews are typically evaluated in the industry.

## Part 1: Coding Challenges

### 🟢 Easy (Foundational)
These questions test your understanding of basic React hooks, state management, and component rendering.

1.  **Counter with History**: Create a counter that can increment, decrement, and reset. Display a list of historical values (e.g., "Incremented to 5", "Decremented to 4").
    *   *Focus*: `useState`, event handling, array manipulation.
2.  **Todo List**: A simple todo list where users can add items, mark them as complete, and delete them.
    *   *Focus*: Forms in React, list rendering (`map`), derived state (filtering active/completed).
3.  **API Data Fetcher**: Fetch data from a public API (like JSONPlaceholder) and display it in a list. Handle loading and error states.
    *   *Focus*: `useEffect`, conditional rendering, async/await.
4.  **Simple Form Validation**: Create a login form with email and password fields. Show error messages if the email is invalid or the password is too short upon submission.
    *   *Focus*: Controlled components, basic regex validation.

### 🟡 Medium (Intermediate)
These questions require combining multiple concepts, optimizing performance, or handling more complex logic.

1.  **Debounced Search Bar**: Implement a search input that fetches results from an API as the user types, but only after they stop typing for 500ms.
    *   *Focus*: `useEffect` cleanup, custom hooks (useDebounce), race condition handling.
2.  **Infinite Scroll**: specific Implement an infinite scrolling list that loads more data when the user reaches the bottom of the page.
    *   *Focus*: `IntersectionObserver`, scroll event listeners (less preferred), ref management.
3.  **Star Rating Component**: Build a star rating component that supports hover states, click selection, and is reusable (accepts `maxStars` prop).
    *   *Focus*: Reusability, complex event handling (mouseEnter, mouseLeave), props design.
4.  **Modal/Dialog System**: Create a global modal system where you can open a modal from anywhere in the app using context or a custom hook.
    *   *Focus*: `createPortal`, `useContext`, closing on click outside/escape key.
5.  **Traffic Light**: Build a traffic light that cycles through Red, Yellow, and Green at different intervals (e.g., Red for 4s, Yellow for 0.5s, Green for 3s).
    *   *Focus*: `useEffect`, `setTimeout` logic, state machines.

### 🔴 Hard (Advanced)
These problems test system design thinking, deep knowledge of React internals, performance optimization, and complex state management.

1.  **Nested Comments System**: Build a Reddit-style comment section that supports infinite nesting of replies.
    *   *Focus*: Recursion, tree data structures, optimistic updates.
2.  **Virtual DOM / List Virtualization**: Implement a simplified "virtual list" that only renders the items currently visible in the viewport (plus a buffer) to handle lists with 10,000+ items efficiently.
    *   *Focus*: Performance, math for positioning, scroll handling.
3.  **Drag and Drop Board**: specific Create a Trello-like board where items can be dragged between columns.
    *   *Focus*: HTML5 Drag and Drop API or pointer events, complex state updates, reordering logic.
4.  **Context-based Form Builder**: Build a form where the schema (fields, types, validation) is provided as a JSON object, and the form renders dynamically.
    *   *Focus*: Dynamic component rendering, complex context usage, separation of concerns.

---

## Part 2: Evaluation Criteria (Industry Standards)

When you are interviewed for a frontend role, interviewers are not just looking for a working solution. They evaluate you on specific signals using a rubric similar to this:

### 1. Problem Solving & Logical Thinking (30%)
*   **Clarification**: Did you ask clarifying questions *before* coding? (e.g., "Should this handle mobile layouts?", "What about network errors?").
*   **Approach**: Did you verbalize your plan? Did you break the problem into smaller sub-components?
*   **Edge Cases**: Did you consider empty states, very long text, API failures, or race conditions?

### 2. React Proficiency & Best Practices (30%)
*   **Component Structure**: Do you create small, reusable components or one giant file?
*   **Hooks Usage**: Do you use `useEffect` correctly (including dependency arrays and cleanup functions)? Do you avoid unnecessary `useEffect` usage?
*   **State Management**: Do you put state in the right place (local vs. lifted)? Do you avoid derived state in `useState`?
*   **Performance**: Do you mention `useMemo` or `useCallback` only when necessary? Do you understand why a component re-renders?

### 3. Code Quality & Readability (20%)
*   **Naming**: Are variable and function names descriptive? (`handleSubmit` vs `onClick`, `userList` vs `data`).
*   **Clean Code**: Is the code formatted? Is logic extracted into helper functions?
*   **CSS/Styling**: Can you implement the design reasonably well? (Flexbox/Grid usage is standard).

### 4. Communication (20%)
*   **Think Aloud**: Can the interviewer follow your thought process? Silence is a red flag.
*   **Receptiveness**: How do you handle hints or feedback? (Defensive vs. Collaborative).
*   **Trade-offs**: Can you explain *why* you chose a specific approach? (e.g., "I'm using Context here, but for a larger app I might use Redux/Zustand because...").

### Key Differentiators (Senior+ Level)
*   **Accessibility (a11y)**: Using semantic HTML (`<button>` vs `<div>`), managing focus, ARIA labels.
*   **Testing**: Mentioning how you would test the component (Unit tests with React Testing Library).
*   **System Design**: Discussing scalability, bundle size, and folder structure for larger applications.

