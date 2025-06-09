/**
 * Counter Slice - Pure Redux Implementation
 *
 * This file demonstrates a complete Redux slice implementation with:
 * - Action Types (constants)
 * - Action Creators (functions that return action objects)
 * - Initial State
 * - Reducer Function
 * - Selectors (functions to extract specific data from state)
 *
 * This is a simple counter example to show basic Redux concepts.
 */

// =============================================================================
// ACTION TYPES
// =============================================================================

/**
 * Action Types are string constants that identify the type of action being dispatched.
 * We use constants to avoid typos and get better IDE support.
 */
export const INCREMENT = "counter/increment" as const;
export const DECREMENT = "counter/decrement" as const;
export const INCREMENT_BY_AMOUNT = "counter/incrementByAmount" as const;
export const RESET = "counter/reset" as const;

// =============================================================================
// ACTION INTERFACES
// =============================================================================

/**
 * Action interfaces define the shape of action objects.
 * Each action has a 'type' property and optionally a 'payload' property.
 */
interface IncrementAction {
  type: typeof INCREMENT;
}

interface DecrementAction {
  type: typeof DECREMENT;
}

interface IncrementByAmountAction {
  type: typeof INCREMENT_BY_AMOUNT;
  payload: number; // The amount to increment by
}

interface ResetAction {
  type: typeof RESET;
}

/**
 * Union type of all possible actions for this slice.
 * This helps TypeScript understand what actions the reducer can handle.
 */
export type CounterAction =
  | IncrementAction
  | DecrementAction
  | IncrementByAmountAction
  | ResetAction;

// =============================================================================
// ACTION CREATORS
// =============================================================================

/**
 * Action creators are functions that return action objects.
 * They make it easier to dispatch actions and provide a clean API.
 */

/**
 * Increment the counter by 1
 */
export const increment = (): IncrementAction => ({
  type: INCREMENT,
});

/**
 * Decrement the counter by 1
 */
export const decrement = (): DecrementAction => ({
  type: DECREMENT,
});

/**
 * Increment the counter by a specific amount
 * @param amount - The number to add to the counter
 */
export const incrementByAmount = (amount: number): IncrementByAmountAction => ({
  type: INCREMENT_BY_AMOUNT,
  payload: amount,
});

/**
 * Reset the counter to 0
 */
export const reset = (): ResetAction => ({
  type: RESET,
});

// =============================================================================
// STATE INTERFACE
// =============================================================================

/**
 * Interface defining the shape of the counter state
 */
export interface CounterState {
  value: number; // Current counter value
  lastAction: string; // Track the last action for demonstration
}

// =============================================================================
// INITIAL STATE
// =============================================================================

/**
 * Initial state for the counter slice.
 * This is the default state when the app starts.
 */
const initialState: CounterState = {
  value: 0,
  lastAction: "none",
};

// =============================================================================
// REDUCER
// =============================================================================

/**
 * Counter Reducer Function
 *
 * This is a pure function that takes the current state and an action,
 * and returns a new state. It must never mutate the original state.
 *
 * @param state - Current state (defaults to initialState)
 * @param action - Action object with type and optional payload
 * @returns New state after applying the action
 */
const counterReducer = (
  state: CounterState = initialState,
  action: CounterAction
): CounterState => {
  // Use a switch statement to handle different action types
  switch (action.type) {
    case INCREMENT:
      // Return new state with incremented value
      return {
        ...state, // Spread existing state
        value: state.value + 1, // Update the value
        lastAction: "increment", // Track the action
      };

    case DECREMENT:
      // Return new state with decremented value
      return {
        ...state,
        value: state.value - 1,
        lastAction: "decrement",
      };

    case INCREMENT_BY_AMOUNT:
      // Return new state with value increased by payload amount
      return {
        ...state,
        value: state.value + action.payload, // Use payload from action
        lastAction: `increment by ${action.payload}`,
      };

    case RESET:
      // Return new state with value reset to 0
      return {
        ...state,
        value: 0,
        lastAction: "reset",
      };

    default:
      // Always return the current state for unknown actions
      // This is important for Redux to work properly
      return state;
  }
};

// =============================================================================
// SELECTORS
// =============================================================================

/**
 * Selectors are functions that extract specific pieces of data from the state.
 * They help encapsulate state access and can be reused across components.
 */

/**
 * Get the counter value from state
 * @param state - Root state object
 * @returns Current counter value
 */
export const selectCounterValue = (state: { counter: CounterState }): number =>
  state.counter.value;

/**
 * Get the last action performed
 * @param state - Root state object
 * @returns Last action string
 */
export const selectLastAction = (state: { counter: CounterState }): string =>
  state.counter.lastAction;

/**
 * Check if counter value is positive
 * @param state - Root state object
 * @returns True if counter is positive
 */
export const selectIsPositive = (state: { counter: CounterState }): boolean =>
  state.counter.value > 0;

/**
 * Check if counter value is even
 * @param state - Root state object
 * @returns True if counter is even
 */
export const selectIsEven = (state: { counter: CounterState }): boolean =>
  state.counter.value % 2 === 0;

// Export the reducer as default
export default counterReducer;
