import { useReducer, useState } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'add-todo':
      return { todos: [...state.todos, { text: action.payload, completed: false }] };
    case 'toggle-todo':
      return {
        todos: state.todos.map((todo, idx) => {
          return action.idx === idx ? { ...todo, completed: !todo.completed } : todo;
        }),
      };
    default:
      return state;
  }
}

export default function UseReducer() {
  const [state, dispatch] = useReducer(reducer, { todos: [] });
  const [text, setText] = useState('');

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'add-todo', payload: text });
          setText('');
        }}
      >
        <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
      </form>
      {/* <pre>{JSON.stringify(state.todos, null, 2)}</pre> */}
      {state.todos.map((todo, idx) => {
        return (
          <div
            key={idx}
            onClick={() => dispatch({ type: 'toggle-todo', idx })}
            style={{ textDecoration: todo.completed ? 'line-through' : '' }}
          >
            {todo.text}
          </div>
        );
      })}
    </>
  );
}
