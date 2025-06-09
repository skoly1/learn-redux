/**
 * Todo Slice - Pure Redux Implementation
 *
 * This file demonstrates a more complex Redux slice with:
 * - Multiple data types (Todo objects)
 * - Array state management
 * - ID generation
 * - Filtering and searching
 *
 * This todo example shows how to handle more complex state operations.
 */

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * Todo item interface
 */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number; // Timestamp
}

/**
 * Todo state interface
 */
export interface TodoState {
  todos: Todo[];
  filter: "ALL" | "ACTIVE" | "COMPLETED"; // Filter for displaying todos
  searchTerm: string; // Search functionality
}

// =============================================================================
// ACTION TYPES
// =============================================================================

/**
 * Action type constants for todo operations
 */
export const ADD_TODO = "todos/addTodo" as const;
export const TOGGLE_TODO = "todos/toggleTodo" as const;
export const DELETE_TODO = "todos/deleteTodo" as const;
export const EDIT_TODO = "todos/editTodo" as const;
export const CLEAR_COMPLETED = "todos/clearCompleted" as const;
export const SET_FILTER = "todos/setFilter" as const;
export const SET_SEARCH_TERM = "todos/setSearchTerm" as const;
export const MARK_ALL_COMPLETE = "todos/markAllComplete" as const;

// =============================================================================
// ACTION INTERFACES
// =============================================================================

interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: string; // Todo text
}

interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: string; // Todo ID
}

interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: string; // Todo ID
}

interface EditTodoAction {
  type: typeof EDIT_TODO;
  payload: {
    id: string;
    text: string;
  };
}

interface ClearCompletedAction {
  type: typeof CLEAR_COMPLETED;
}

interface SetFilterAction {
  type: typeof SET_FILTER;
  payload: "ALL" | "ACTIVE" | "COMPLETED";
}

interface SetSearchTermAction {
  type: typeof SET_SEARCH_TERM;
  payload: string;
}

interface MarkAllCompleteAction {
  type: typeof MARK_ALL_COMPLETE;
}

/**
 * Union type of all possible todo actions
 */
export type TodoAction =
  | AddTodoAction
  | ToggleTodoAction
  | DeleteTodoAction
  | EditTodoAction
  | ClearCompletedAction
  | SetFilterAction
  | SetSearchTermAction
  | MarkAllCompleteAction;

// =============================================================================
// ACTION CREATORS
// =============================================================================

/**
 * Add a new todo
 * @param text - Todo text content
 */
export const addTodo = (text: string): AddTodoAction => ({
  type: ADD_TODO,
  payload: text,
});

/**
 * Toggle todo completion status
 * @param id - Todo ID
 */
export const toggleTodo = (id: string): ToggleTodoAction => ({
  type: TOGGLE_TODO,
  payload: id,
});

/**
 * Delete a todo
 * @param id - Todo ID
 */
export const deleteTodo = (id: string): DeleteTodoAction => ({
  type: DELETE_TODO,
  payload: id,
});

/**
 * Edit todo text
 * @param id - Todo ID
 * @param text - New todo text
 */
export const editTodo = (id: string, text: string): EditTodoAction => ({
  type: EDIT_TODO,
  payload: { id, text },
});

/**
 * Clear all completed todos
 */
export const clearCompleted = (): ClearCompletedAction => ({
  type: CLEAR_COMPLETED,
});

/**
 * Set the current filter
 * @param filter - Filter type
 */
export const setFilter = (
  filter: "ALL" | "ACTIVE" | "COMPLETED"
): SetFilterAction => ({
  type: SET_FILTER,
  payload: filter,
});

/**
 * Set search term for filtering todos
 * @param searchTerm - Search string
 */
export const setSearchTerm = (searchTerm: string): SetSearchTermAction => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm,
});

/**
 * Mark all todos as complete (or incomplete if all are complete)
 */
export const markAllComplete = (): MarkAllCompleteAction => ({
  type: MARK_ALL_COMPLETE,
});

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Generate a unique ID for new todos
 * In a real app, you might use a library like uuid
 */
const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// =============================================================================
// INITIAL STATE
// =============================================================================

/**
 * Initial state for todos
 */
const initialState: TodoState = {
  todos: [
    // Some sample todos for demonstration
    {
      id: "1",
      text: "Learn Redux fundamentals",
      completed: true,
      createdAt: Date.now() - 86400000, // 1 day ago
    },
    {
      id: "2",
      text: "Build a todo app with Redux",
      completed: false,
      createdAt: Date.now() - 3600000, // 1 hour ago
    },
    {
      id: "3",
      text: "Master React-Redux patterns",
      completed: false,
      createdAt: Date.now(),
    },
  ],
  filter: "ALL",
  searchTerm: "",
};

// =============================================================================
// REDUCER
// =============================================================================

/**
 * Todo Reducer Function
 *
 * Handles all todo-related state changes. This demonstrates working with
 * arrays, objects, and more complex state updates while maintaining immutability.
 *
 * @param state - Current todo state
 * @param action - Action to process
 * @returns New state after applying action
 */
const todoReducer = (
  state: TodoState = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      // Add new todo to the beginning of the array
      return {
        ...state,
        todos: [
          {
            id: generateId(),
            text: action.payload,
            completed: false,
            createdAt: Date.now(),
          },
          ...state.todos,
        ],
      };

    case TOGGLE_TODO:
      // Toggle the completed status of a specific todo
      return {
        ...state,
        todos: state.todos.map(
          (todo) =>
            todo.id === action.payload
              ? { ...todo, completed: !todo.completed } // Create new todo object
              : todo // Keep existing todo unchanged
        ),
      };

    case DELETE_TODO:
      // Remove todo from array
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case EDIT_TODO:
      // Update todo text
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };

    case CLEAR_COMPLETED:
      // Remove all completed todos
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    case SET_FILTER:
      // Update the current filter
      return {
        ...state,
        filter: action.payload,
      };

    case SET_SEARCH_TERM:
      // Update search term
      return {
        ...state,
        searchTerm: action.payload,
      };

    case MARK_ALL_COMPLETE:
      // Check if all todos are completed
      const allCompleted = state.todos.every((todo) => todo.completed);

      // If all are completed, mark all as incomplete; otherwise mark all as complete
      return {
        ...state,
        todos: state.todos.map((todo) => ({
          ...todo,
          completed: !allCompleted,
        })),
      };

    default:
      return state;
  }
};

// =============================================================================
// SELECTORS
// =============================================================================

/**
 * Selectors for accessing todo state
 */

/**
 * Get all todos
 */
export const selectAllTodos = (state: { todos: TodoState }): Todo[] =>
  state.todos.todos;

/**
 * Get current filter
 */
export const selectCurrentFilter = (state: { todos: TodoState }): string =>
  state.todos.filter;

/**
 * Get search term
 */
export const selectSearchTerm = (state: { todos: TodoState }): string =>
  state.todos.searchTerm;

/**
 * Get filtered todos based on current filter and search term
 */
export const selectFilteredTodos = (state: { todos: TodoState }): Todo[] => {
  const { todos, filter, searchTerm } = state.todos;

  // First filter by search term
  let filteredTodos = todos;
  if (searchTerm) {
    filteredTodos = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Then filter by completion status
  switch (filter) {
    case "ACTIVE":
      return filteredTodos.filter((todo) => !todo.completed);
    case "COMPLETED":
      return filteredTodos.filter((todo) => todo.completed);
    case "ALL":
    default:
      return filteredTodos;
  }
};

/**
 * Get todo statistics
 */
export const selectTodoStats = (state: { todos: TodoState }) => {
  const todos = state.todos.todos;
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  return {
    total,
    completed,
    active,
    completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
};

/**
 * Check if all todos are completed
 */
export const selectAllTodosCompleted = (state: {
  todos: TodoState;
}): boolean => {
  const todos = state.todos.todos;
  return todos.length > 0 && todos.every((todo) => todo.completed);
};

// Export the reducer as default
export default todoReducer;
