/**
 * TodoApp Component - Advanced Redux Integration Example
 *
 * This component demonstrates more complex Redux patterns:
 * - Managing array state (todos)
 * - Multiple action types with different payloads
 * - State filtering and searching
 * - Computed selectors for derived data
 * - Complex user interactions
 */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Import action creators
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  clearCompleted,
  setFilter,
  setSearchTerm,
  markAllComplete,
} from "../store/slices/todoSlice";

// Import selectors
import {
  selectFilteredTodos,
  selectCurrentFilter,
  selectSearchTerm,
  selectTodoStats,
  selectAllTodosCompleted,
} from "../store/slices/todoSlice";

// Import types
import type { Todo } from "../store/slices/todoSlice";

/**
 * TodoApp Component
 *
 * Demonstrates advanced Redux patterns:
 * - Array state management
 * - Complex filtering and searching
 * - Multiple action dispatching
 * - Computed state with selectors
 */
const TodoApp: React.FC = () => {
  // Local state for form inputs
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  // ==========================================================================
  // REDUX STATE - Using Selectors
  // ==========================================================================

  /**
   * Using selectors to get derived and computed state.
   * These selectors encapsulate business logic and can be reused.
   */
  const filteredTodos = useSelector(selectFilteredTodos);
  const currentFilter = useSelector(selectCurrentFilter);
  const searchTerm = useSelector(selectSearchTerm);
  const todoStats = useSelector(selectTodoStats);
  const allTodosCompleted = useSelector(selectAllTodosCompleted);

  // ==========================================================================
  // REDUX DISPATCH
  // ==========================================================================

  const dispatch = useDispatch();

  // ==========================================================================
  // EVENT HANDLERS - Todo Management
  // ==========================================================================

  /**
   * Handle adding a new todo
   * Demonstrates dispatching actions with string payload
   */
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      dispatch(addTodo(newTodoText.trim())); // Dispatch with payload
      setNewTodoText(""); // Clear input
    }
  };

  /**
   * Handle toggling todo completion
   * Demonstrates dispatching actions with ID payload
   */
  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id)); // Dispatch with todo ID
  };

  /**
   * Handle deleting a todo
   * Demonstrates dispatching actions with ID payload
   */
  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id)); // Dispatch with todo ID
  };

  /**
   * Start editing a todo
   * Sets local state for editing mode
   */
  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  /**
   * Save edited todo
   * Demonstrates dispatching actions with complex payload
   */
  const handleSaveEdit = () => {
    if (editingId && editText.trim()) {
      dispatch(editTodo(editingId, editText.trim())); // Dispatch with object payload
      setEditingId(null);
      setEditText("");
    }
  };

  /**
   * Cancel editing
   */
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // ==========================================================================
  // EVENT HANDLERS - Bulk Operations
  // ==========================================================================

  /**
   * Clear all completed todos
   * Demonstrates dispatching actions with no payload
   */
  const handleClearCompleted = () => {
    dispatch(clearCompleted()); // Dispatch with no payload
  };

  /**
   * Mark all todos as complete/incomplete
   * Demonstrates dispatching actions that affect multiple items
   */
  const handleMarkAllComplete = () => {
    dispatch(markAllComplete()); // Dispatch with no payload
  };

  // ==========================================================================
  // EVENT HANDLERS - Filtering
  // ==========================================================================

  /**
   * Handle filter change
   * Demonstrates dispatching actions with enum payload
   */
  const handleFilterChange = (filter: "ALL" | "ACTIVE" | "COMPLETED") => {
    dispatch(setFilter(filter)); // Dispatch with filter type
  };

  /**
   * Handle search term change
   * Demonstrates dispatching actions with string payload for search
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    dispatch(setSearchTerm(term)); // Dispatch with search term
  };

  // ==========================================================================
  // RENDER HELPERS
  // ==========================================================================

  /**
   * Render a single todo item
   * Demonstrates conditional rendering based on editing state
   */
  const renderTodo = (todo: Todo) => {
    const isEditing = editingId === todo.id;

    return (
      <div
        key={todo.id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px",
          backgroundColor: todo.completed ? "#f8f9fa" : "white",
          border: "1px solid #dee2e6",
          borderRadius: "4px",
          marginBottom: "5px",
        }}
      >
        {/* Toggle checkbox */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggleTodo(todo.id)}
          style={{ cursor: "pointer" }}
        />

        {/* Todo text (editable or display) */}
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveEdit();
              if (e.key === "Escape") handleCancelEdit();
            }}
            style={{
              flex: 1,
              padding: "4px 8px",
              border: "1px solid #007bff",
              borderRadius: "3px",
            }}
            autoFocus
          />
        ) : (
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#6c757d" : "black",
              cursor: "pointer",
            }}
            onClick={() => handleStartEdit(todo)}
          >
            {todo.text}
          </span>
        )}

        {/* Action buttons */}
        {isEditing ? (
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              onClick={handleSaveEdit}
              style={{
                padding: "2px 8px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "3px",
                fontSize: "12px",
              }}
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              style={{
                padding: "2px 8px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "3px",
                fontSize: "12px",
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleDeleteTodo(todo.id)}
            style={{
              padding: "2px 8px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "3px",
              fontSize: "12px",
            }}
          >
            Delete
          </button>
        )}
      </div>
    );
  };

  // ==========================================================================
  // MAIN RENDER
  // ==========================================================================

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #28a745",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>📝 Todo App Component</h2>
      <p style={{ fontSize: "12px", color: "#666", marginBottom: "20px" }}>
        This component demonstrates advanced Redux patterns: array management,
        filtering, complex actions, and computed selectors.
      </p>

      {/* Statistics Display */}
      <div
        style={{
          backgroundColor: "#e9ecef",
          padding: "10px",
          borderRadius: "4px",
          marginBottom: "15px",
        }}
      >
        <div style={{ display: "flex", gap: "20px", fontSize: "14px" }}>
          <span>
            <strong>Total:</strong> {todoStats.total}
          </span>
          <span>
            <strong>Active:</strong> {todoStats.active}
          </span>
          <span>
            <strong>Completed:</strong> {todoStats.completed}
          </span>
          <span>
            <strong>Progress:</strong> {todoStats.completionPercentage}%
          </span>
        </div>
      </div>

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} style={{ marginBottom: "15px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Enter a new todo..."
            style={{
              flex: 1,
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Todo
          </button>
        </div>
      </form>

      {/* Search and Filters */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search todos..."
          style={{
            padding: "6px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "200px",
          }}
        />

        {/* Filter Buttons */}
        <div style={{ display: "flex", gap: "5px" }}>
          {(["ALL", "ACTIVE", "COMPLETED"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              style={{
                padding: "6px 12px",
                backgroundColor:
                  currentFilter === filter ? "#007bff" : "#e9ecef",
                color: currentFilter === filter ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button
          onClick={handleMarkAllComplete}
          style={{
            padding: "6px 12px",
            backgroundColor: "#17a2b8",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          {allTodosCompleted ? "Mark All Incomplete" : "Mark All Complete"}
        </button>
        <button
          onClick={handleClearCompleted}
          disabled={todoStats.completed === 0}
          style={{
            padding: "6px 12px",
            backgroundColor: todoStats.completed === 0 ? "#6c757d" : "#ffc107",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: todoStats.completed === 0 ? "not-allowed" : "pointer",
            fontSize: "12px",
          }}
        >
          Clear Completed ({todoStats.completed})
        </button>
      </div>

      {/* Todo List */}
      <div
        style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "15px" }}
      >
        {filteredTodos.length === 0 ? (
          <div
            style={{ textAlign: "center", color: "#6c757d", padding: "20px" }}
          >
            {searchTerm ? `No todos match "${searchTerm}"` : "No todos found"}
          </div>
        ) : (
          filteredTodos.map(renderTodo)
        )}
      </div>

      {/* Educational Notes */}
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
            <strong>Array State:</strong> Managing lists with immutable updates
          </li>
          <li>
            <strong>Complex Actions:</strong> Actions with different payload
            types
          </li>
          <li>
            <strong>Computed Selectors:</strong> Deriving data from state
          </li>
          <li>
            <strong>State Filtering:</strong> Real-time filtering without
            mutating state
          </li>
          <li>
            <strong>Bulk Operations:</strong> Actions that affect multiple items
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
