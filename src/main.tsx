/**
 * Main Application Entry Point
 *
 * This file sets up the React application with Redux Provider.
 * The Provider makes the Redux store available to all React components
 * in the component tree through React context.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Redux Provider component
import "./index.css";
import App from "./App.tsx";
import store from "./store/index"; // Import Redux store

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 
      The Provider component makes the Redux store available to any nested 
      components that need to access the Redux store 
    */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
