/**
 * Main App Component - Redux Learning Application
 *
 * This is the root component that demonstrates a complete Redux implementation
 * with two different examples: Counter and TodoApp.
 *
 * The app showcases:
 * - Pure Redux implementation (no Redux Toolkit)
 * - Multiple slices with different complexity levels
 * - Complete Redux patterns for learning
 */

import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import Counter from "./components/Counter";
import TodoApp from "./components/TodoApp";
import "./App.css";
import Test from "./components/Test";

function App() {
  // Example of accessing Redux state at the app level
  const counterValue = useSelector((state: RootState) => state.counter.value);
  const todoCount = useSelector((state: RootState) => state.todos.todos.length);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#333", marginBottom: "10px" }}>
          🎓 Learn Redux - Pure Implementation
        </h1>
        <p style={{ color: "#666", fontSize: "16px", marginBottom: "20px" }}>
          A comprehensive example of Redux fundamentals without Redux Toolkit
        </p>

        {/* Global State Display */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "8px",
            border: "2px solid #e9ecef",
            display: "inline-block",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#495057" }}>
            🌐 Global Redux State
          </h3>
          <div style={{ display: "flex", gap: "20px", fontSize: "14px" }}>
            <span>
              <strong>Counter Value:</strong> {counterValue}
            </span>
            <span>
              <strong>Total Todos:</strong> {todoCount}
            </span>
          </div>
          <p
            style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#6c757d" }}
          >
            This data is read directly from Redux store using useSelector
          </p>
        </div>
      </header>

      {/* Introduction */}
      <div
        style={{
          backgroundColor: "#e7f3ff",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          border: "1px solid #bee5eb",
        }}
      >
        <h2 style={{ margin: "0 0 15px 0", color: "#0c5460" }}>
          📚 What You'll Learn
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "15px",
          }}
        >
          <div>
            <h4 style={{ margin: "0 0 8px 0", color: "#0c5460" }}>
              Core Redux Concepts:
            </h4>
            <ul style={{ margin: 0, fontSize: "14px", color: "#155724" }}>
              <li>Actions & Action Creators</li>
              <li>Reducers & Pure Functions</li>
              <li>Store Configuration</li>
              <li>State Immutability</li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: "0 0 8px 0", color: "#0c5460" }}>
              React-Redux Integration:
            </h4>
            <ul style={{ margin: 0, fontSize: "14px", color: "#155724" }}>
              <li>useSelector Hook</li>
              <li>useDispatch Hook</li>
              <li>Provider Component</li>
              <li>Selectors & Computed State</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Redux Examples */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Counter Example */}
        <Counter />
        <Test />

        {/* Todo App Example */}
        <TodoApp />
      </div>

      {/* Redux DevTools Info */}
      <div
        style={{
          backgroundColor: "#fff3cd",
          padding: "15px",
          borderRadius: "8px",
          marginTop: "30px",
          border: "1px solid #ffeaa7",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "#856404" }}>
          🔧 Redux DevTools
        </h3>
        <p style={{ margin: "0", fontSize: "14px", color: "#856404" }}>
          Open your browser's developer tools and look for the "Redux" tab to
          inspect state changes, time-travel debug, and see dispatched actions
          in real-time.
        </p>
      </div>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "20px",
          borderTop: "1px solid #e9ecef",
        }}
      >
        <p style={{ color: "#6c757d", fontSize: "14px", margin: 0 }}>
          This application demonstrates pure Redux implementation for
          educational purposes.
          <br />
          Study the code in <code>src/store/</code> and{" "}
          <code>src/components/</code> directories.
        </p>
      </footer>
    </div>
  );
}

export default App;
