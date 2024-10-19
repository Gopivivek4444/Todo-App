import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ]);

  return (
    <div className="container mt-4">
      <h1>TODO LIST</h1>
      <TodoList todosProps={todos} setTodosProps={setTodos} />
      <AddTodo setTodosProps={setTodos} />
    </div>
  );
}

function TodoList({ todosProps, setTodosProps }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todosProps.map(t => 
      t.id === todo.id ? { ...t, done: !t.done } : t
    );
    setTodosProps(updatedTodos);
  }

  if(!todosProps.length){
    return <h3 className='text-center text-danger'>No Todos Left</h3>
  }

  return (
    <ul className="list-group">
      {todosProps.map(todo => (
        <li
          key={todo.id}
          className="list-group-item d-flex justify-content-between align-items-center"
          onClick={() => handleToggleTodo(todo)}
        >
          <span
            style={{
              color: todo.done ? 'red' : 'green',  // Change text color when done
              textDecoration: todo.done ? 'line-through' : 'none',  // Apply line-through only to text
            }}
          >
            {todo.text}
          </span>
          <DeleteTodo singleTodoProp={todo} setTodosProps={setTodosProps} />
        </li>
      ))}
    </ul>
  );
}



function DeleteTodo({ singleTodoProp, setTodosProps }) {
  function handleDeleteTodo() {
    // const confirmed = window.confirm("Do you want to delete this?");
    // if (confirmed) {
      setTodosProps(prevTodos => 
        prevTodos.filter(t => t.id !== singleTodoProp.id)
      );
    // }
  }

  return (
    <span
      onDoubleClick={handleDeleteTodo}
      role="button"
      style={{ marginLeft: 10 }}
    >
      X
    </span>
  );
}

function AddTodo({ setTodosProps }) {
  const inputRef = React.useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    const todo = { id: Math.random(), text, done: false };
    setTodosProps(prevTodos => prevTodos.concat(todo));
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleAddTodo}>
      <div className="input-group mb-3">
        <input name="addTodo" type="text" className="form-control" placeholder="Add Todo" ref={inputRef} />
        <button className="btn btn-outline-secondary" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default App;
