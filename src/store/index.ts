/**
 * Redux Store Configuration
 *
 * This file sets up the main Redux store using pure Redux.
 * It combines all the reducers from different slices and creates
 * a single store that holds the entire application state.
 */

import { createStore, combineReducers } from "redux";
import type { Store, AnyAction } from "redux";
import counterReducer from "./slices/counterSlice";
import todoReducer from "./slices/todoSlice";

// Define the root state type by combining all slice states
export interface RootState {
  counter: ReturnType<typeof counterReducer>;
  todos: ReturnType<typeof todoReducer>;
}

/**
 * Root Reducer
 *
 * This combines all individual slice reducers into a single root reducer.
 * Each reducer manages its own slice of the application state.
 */
const rootReducer = combineReducers({
  counter: counterReducer, // Manages counter state
  todos: todoReducer, // Manages todos state
});

/**
 * Create Store
 *
 * This creates the Redux store with:
 * - The root reducer that handles all state updates
 * - Redux DevTools integration for debugging (only in development)
 */
const store: Store<RootState, AnyAction> = createStore(
  rootReducer,
  // Enable Redux DevTools in development
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
