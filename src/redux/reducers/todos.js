import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  CLEAR_TODOS,
} from '../actionTypes';

let initialState = '';
let todoData = JSON.parse(window.localStorage.getItem('todos'));

if (todoData && todoData[0] !== undefined) {
  initialState = {
    todos: todoData,
  };
} else {
  initialState = {
    todos: [],
  };
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        todos: [
          {
            id: state.todos.length ? state.todos[0].id + 1 : 1,
            content: action.payload.content,
            isDone: false,
          },
          ...state.todos,
        ],
      };
    }

    case DELETE_TODO: {
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }

    case TOGGLE_TODO: {
      return {
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }),
      };
    }

    case CLEAR_TODOS: {
      return {
        todos: [],
      };
    }

    default: {
      return state;
    }
  }
}
