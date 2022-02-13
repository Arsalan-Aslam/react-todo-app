import React, {useState} from 'react';
import '../Todos/Todos.css'


function Todos () {

    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [updatedValue, setUpdatedValue] = useState("");
    const [indexValue, setIndexValue] = useState("");


const addToDo = (e) => {
    e.preventDefault();
    if(inputValue === "") {
        alert("Please enter a task")
    } else {
        // console.log(inputValue);
        todos.push(inputValue);
        setTodos([...todos]);
        setInputValue("");
    } 
    
} 

const updateToDo = (index) => {
    if(updatedValue === "") {
        alert("Please enter an updated details");
    } else {
        // console.log(inputValue);
        todos.splice(index,1,updatedValue);
        setTodos([...todos]);
        setUpdatedValue("");
        setIndexValue("");
        console.log(todos);
    }     
}

const cancelTodo = () => {
    setIndexValue("");
}

const deleteTodo = (index) => {
    console.log(index);
    // console.log("todo", todos.filter((v, i) => i !== index));
    // todos.filter((v, i) => i !== index)
    todos.splice(index,1);
    setTodos([...todos]);
    console.log(todos); 
} 

const deleteAll = () => {
    setTodos([]);
}


  return (
    <>
    <div className='todos-app'>
        <form onSubmit={(e)=>addToDo(e)}>
        <h1>Todo App</h1>
        <input type="text"  value={inputValue} placeholder="Enter your task here..." onChange={(e) => setInputValue(e.target.value)} autoFocus />
        <button>Add Task</button>
        </form>
    
        <section>
            {todos.length > 0? <div id="tasks-header"><h2>Tasks</h2> <button id="delete" onClick={deleteAll}>Delete All</button></div> : ""}        
            <ul className="todos-container">
                {todos.map((v, i) => {
                        return indexValue === i? (  
                    
                        <div key={i} className="update-task">
                            <input type="text"defaultValue={v} onChange={(e) => setUpdatedValue(e.target.value)} autoFocus />
                            <button id="update" onClick={()=>updateToDo(i)}>Update</button> 
                            <button id="cancel" onClick={cancelTodo}>Cancel</button>
                        </div>
                        ) : (
                        <div key={i} className="task">
                            <li>{v}</li>
                            <button id="edit" onClick={()=>setIndexValue(i)}>Edit</button> 
                            <button id="delete" onClick={() =>deleteTodo(i)} >Delete</button>
                        </div>
                        );
                        
                })}
            </ul>
        </section>
    </div>
    </>
  )
}

export default Todos;


