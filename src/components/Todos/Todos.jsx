import React, {useState} from 'react';
import '../Todos/Todos.css'


const Todos = () => {

    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [updatedValue, setUpdatedValue] = useState("");

// console.log(inputValue);

const addToDo = (e) => {
    e.preventDefault();
    if(inputValue === "") {
        alert("Please enter a task")
    } else {
        // console.log(inputValue);
        todos.push(inputValue);
        setTodos([...todos]);
        setInputValue("");
        console.log(inputValue);
    } 
    
} 
const updateToDo = (index) => {
    if(updatedValue === "") {
        alert("Please enter an updated details")
    } else {
        // console.log(inputValue);
        todos.splice(index,1,updatedValue);
        setTodos([...todos]);
        setUpdatedValue("");
        console.log(todos);
        hideUpdateField();
    } 
    
}

const deleteTodo = (index) => {
    console.log(index);
    // console.log("todo", todos.filter((v, i) => i !== index));
    // todos.filter((v, i) => i !== index)
    todos.splice(index,1);
    setTodos([...todos]);
    console.log(todos);
    
} 

const showUpdateField = () => {
    document.querySelector(".task").style.display = 'none';
    document.querySelector(".update-task").style.display = 'block';
}

const hideUpdateField = () => {
    document.querySelector(".task").style.display = 'block';
    document.querySelector(".update-task").style.display = 'none';
}

  return (
    <>
    <div className='todos-app'>
        <form onSubmit={(e)=>addToDo(e)}>
        <h1>Todo App</h1>
        <input type="text"  value = {inputValue} placeholder="Enter your task here..." onChange={(e) => setInputValue(e.target.value)}/>
        <small id="warning">Please enter a task...</small>
        <button>Add Task</button>
        </form>
    
        <section>
            <h2>Tasks</h2>        
            <ul className="todos-container">
                {todos.map((v, i) => {
                    return (  
                        
                        <div key={i} className="list-item">
                            <div className="task">
                                <li>{v}</li>
                                <button id="edit" onClick={showUpdateField}>Edit</button> 
                                <button id="delete" onClick={() =>deleteTodo(i)} >Delete</button>
                            </div>

                            <div className="update-task">
                                <input type="text"defaultValue={v} onChange={(e) => setUpdatedValue(e.target.value)}/>
                                <button id="update" onClick={()=>updateToDo(i)}>Update</button> 
                                <button id="cancel" onClick={hideUpdateField}>Cancel</button>
                            </div>
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


