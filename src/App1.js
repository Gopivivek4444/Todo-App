import { createContext, useContext, useRef, useState } from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
const UserContext = createContext();

export default function App() {

    const [todos, setTodos] = useState([
        {id: 1, text: "Hi", done: false},
        {id: 2, text: "Gopi", done: false},
        {id: 3, text: "Ram", done: false}
    ])
    return(
        <UserContext.Provider value={{todos, setTodos}}>
        <>
        <div className="container mt-4">
            <h1>TODO LIST</h1>
        <Todolist1/>
        <AddTodo1/>
        </div>
        </>
        </UserContext.Provider>
    )
}


export function Todolist1(){

const {todos, setTodos} = useContext(UserContext);  

    function HandleToggleTodo(todo){

       const Updated_Todos = todos.map((t) => t.id===todo.id ? {...t, done:!t.done} : t)

       setTodos(Updated_Todos);
    }

if(!todos.length){
   return (
    <div className="text-center text-danger" style={{marginBottom:50,marginTop:50}}>
            <h3>No Todos Left</h3>
            <h3>Add TODO</h3>
   </div>
   )
}

    return(
        <ul className="list-group">
            {todos.map((todo) =>            // useContext(UserContext).map((todo) =>
            <>
            <li className="list-group-item d-flex justify-content-between align-items-center"
            onDoubleClick={() => HandleToggleTodo(todo)}
            key={todo.id}
            >
                <span style={{color: todo.done ? 'red' : 'green' ,textDecoration: todo.done?"line-through":"" }}>
                     {todo.text}
                </span>  
                <DeleteTodo todo = {todo}/>
            </li>
            {/* <DeleteTodo todo = {todo}/> */}
            </>
            )}
        </ul>
    )
}

 export function DeleteTodo({todo}){    
   
    const {todos, setTodos} = useContext(UserContext);

    function HandleDeleteTodo(){

    const newTodos = todos.filter((t) => t.id !== todo.id)

    setTodos(newTodos);
    }

    return(
      <button className = "button text-" onClick={HandleDeleteTodo}>
        Delete
      </button>
    // <span role="button" style={{marginLeft:10}} onClick={HandleDeleteTodo}>
    //     X
    // </span>
    )
}

export function AddTodo1(){

    const {setTodos} = useContext(UserContext);

    const inputReference = useRef();

    function HandleAddTodo(event){
        event.preventDefault();
        const text = event.target.elements.AddTodo.value;
        const todo ={
            id: Math.random(),
            text,
            done:false
        }

        setTodos((previousTodos) => previousTodos.concat(todo) )

        inputReference.current.value = ""; 
       
        
        
    }
    return(
        <form onSubmit={HandleAddTodo}>
            <div className="input-group mb-3">
            <input className="form-control" placeholder="Add Todo" name="AddTodo" ref={inputReference}/>
            <button className="btn btn-outline-secondary"type="submit">Add Todo</button>     
            </div>       
        </form>
    )
}