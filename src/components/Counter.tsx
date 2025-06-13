/**
 * Counter Component - Redux Integration Example
 *
 * This component demonstrates how to connect a React component to Redux:
 * - Reading state from Redux store using useSelector
 * - Dispatching actions using useDispatch
 * - Using selectors to extract specific data
 * - Handling user interactions that trigger state changes
 */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";

// Import action creators
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  INCREMENT,
  DECREMENT,
  INCREMENT_BY_AMOUNT,
} from "../store/slices/counterSlice";

// Import selectors
import {
  selectCounterValue,
  selectLastAction,
  selectIsPositive,
  selectIsEven,
} from "../store/slices/counterSlice";

/**
 * Counter Component
 *
 * A simple counter that demonstrates basic Redux patterns:
 * - State reading with useSelector
 * - Action dispatching with useDispatch
 * - Multiple types of actions (simple and with payload)
 */
const Counter: React.FC = () => {
  // Local state for the increment amount input
  const [incrementAmount, setIncrementAmount] = useState<string>("2");

  // ==========================================================================
  // REDUX HOOKS - Reading State
  // ==========================================================================

  /**
   * useSelector hook allows us to extract data from the Redux store state.
   * It takes a selector function that receives the entire state and returns
   * the specific piece of state this component needs.
   */

  // Using individual selectors (recommended approach)
  const counterValue = useSelector(selectCounterValue);
  const lastAction = useSelector(selectLastAction);
  const isPositive = useSelector(selectIsPositive);
  const isEven = useSelector(selectIsEven);

  // Alternative: Direct state access (less preferred)
  // const counterValue = useSelector((state: RootState) => state.counter.value);

  // ==========================================================================
  // REDUX HOOKS - Dispatching Actions
  // ==========================================================================

  /**
   * useDispatch hook gives us access to the dispatch function.
   * We use dispatch to send actions to the Redux store, which then
   * triggers the reducer to update the state.
   */
  const dispatch = useDispatch();

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================

  /**
   * Handle increment button click
   * Dispatches the increment action
   */
  const handleIncrement = () => {
    dispatch({ type: INCREMENT }); 
  };

  /**
   * Handle decrement button click
   * Dispatches the decrement action
   */
  const handleDecrement = () => {
    dispatch(decrement()); // Dispatch action with no payload
  };

  /**
   * Handle increment by amount button click
   * Dispatches incrementByAmount action with a numeric payload
   */
  const handleIncrementByAmount = () => {
    const amount = parseInt(incrementAmount, 10);
    if (!isNaN(amount)) {
      // dispatch(incrementByAmount(amount)); // Dispatch action with payload
      dispatch({ type: INCREMENT_BY_AMOUNT, payload: amount });
    }
  };

  /**
   * Handle reset button click
   * Dispatches the reset action
   */
  const handleReset = () => {
    dispatch(reset()); // Dispatch action with no payload
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #007bff",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>🔢 Counter Component</h2>
      <p style={{ fontSize: "12px", color: "#666", marginBottom: "20px" }}>
        This component demonstrates basic Redux patterns: useSelector,
        useDispatch, action creators, and selectors.
      </p>

      {/* Display current counter value */}
      <div style={{ fontSize: "24px", margin: "20px 0", textAlign: "center" }}>
        <strong>
          Count:{" "}
          <span style={{ color: isPositive ? "green" : "red" }}>
            {counterValue}
          </span>
        </strong>
      </div>

      {/* Display computed values using selectors */}
      <div style={{ margin: "15px 0", fontSize: "14px" }}>
        <div>
          Last Action: <em>{lastAction}</em>
        </div>
        <div>
          Is Positive:{" "}
          <span style={{ color: isPositive ? "green" : "red" }}>
            {isPositive ? "✓" : "✗"}
          </span>
        </div>
        <div>
          Is Even:{" "}
          <span style={{ color: isEven ? "blue" : "orange" }}>
            {isEven ? "✓" : "✗"}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "15px",
        }}
      >
        <button
          onClick={handleIncrement}
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          +1 Increment
        </button>

        <button
          onClick={handleDecrement}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          -1 Decrement
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🔄 Reset
        </button>
      </div>

      {/* Increment by amount section */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
          style={{
            padding: "6px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "80px",
          }}
          placeholder="Amount"
        />
        <button
          onClick={handleIncrementByAmount}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Increment by Amount
        </button>
      </div>

      {/* Educational notes */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
          fontSize: "12px",
        }}
      >
        <strong>🎓 Learning Notes:</strong>
        <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
          <li>
            <strong>useSelector:</strong> Extracts data from Redux state
          </li>
          <li>
            <strong>useDispatch:</strong> Sends actions to update state
          </li>
          <li>
            <strong>Action Creators:</strong> Functions that return action
            objects
          </li>
          <li>
            <strong>Selectors:</strong> Functions that compute derived state
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Counter;
