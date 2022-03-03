import React, {useEffect, useState} from 'react';
import '../Todos/Todos.css';
import {db} from '../../config/firebase';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    where
} from 'firebase/firestore';

function Todos () {

    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [updatedValue, setUpdatedValue] = useState("");
    const [indexValue, setIndexValue] = useState("");
    // const [refresh, setRefresh] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(async () => {
    //     const dbRef = collection(db, "todos");
    //     const data = await getDocs(dbRef);
    //     // console.log(data);
    //     let getTodo = [];
    //     data.forEach((doc) => {
    //         getTodo.push({
    //             key: doc.id, 
    //             todo: doc.data().todo
    //         });
    //     });
    //     setTodos(getTodo);
    // }, [refresh]);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const dbRef = collection(db, "todos");
        const q = query(dbRef);
        const dataFeed = onSnapshot(q, (querySnapshot) => {
            let getTodo = [];
            querySnapshot.forEach((doc) => {
                getTodo.push({key:doc.id, todo:doc.data().todo});
            });
            setTodos(getTodo);
        });
    }, []);

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(() => {
    //     db.collection('todos').onSnapshot(snapshot => (
    //         setTodos(snapshot.docs.map(doc => doc.data()))
    //     ))
    // }, []);

    // console.log(todos);


const addToDo = async (e) => {
    e.preventDefault();
    if(inputValue === "") {
        alert("Please enter a task")
    } else {
        // console.log(inputValue);
        // todos.push(inputValue);
        // setTodos([...todos]);
        try {
            const dbRef = collection(db, "todos");
            const addData = await addDoc(dbRef,{todo:inputValue});
            // console.log(addData);
            setInputValue("");
            // setRefresh(!refresh);
        } catch (error) {
            console.log(error)
        }
    } 
    
} 

// const updateToDo = (index) => {
//     if(updatedValue === "") {
//         alert("Please enter an updated details");
//     } else {
//         // console.log(inputValue);
//         todos.splice(index,1,updatedValue);
//         setTodos([...todos]);
//         setUpdatedValue("");
//         setIndexValue("");
//         console.log(todos);
//     }     
// }

// const updateToDo = (index) => {
//     if(updatedValue === "") {
//         alert("Please enter an updated details");
//     } else {
//         console.log(inputValue);
//         todos.splice(index,1,updatedValue);
//         setTodos([...todos]);
//         setUpdatedValue("");
//         setIndexValue("");
//         console.log(todos);
        
//     }     
// }


const updateToDo = async (key) => {
    if(updatedValue === "") {
        alert("Please enter an updated details");
    } else {
        // console.log(inputValue);
        // todos.splice(index,1,updatedValue);
        // setTodos([...todos]);
        // setUpdatedValue("");
        // setIndexValue("");
        // console.log(todos);
        // console.log(key);
        const dbRef = doc(db, "todos", key);
        const obj = {todo: updatedValue};

        try{
            const updateTodo = await updateDoc(dbRef, obj);
            // console.log(updateTodo);
            // setRefresh(!refresh);
            setUpdatedValue("");
            setIndexValue("");
        } catch (error) {
            console.log(error);
        }
    }     
}

const cancelTodo = () => {
    setIndexValue("");
}

// const deleteTodo = (index) => {
//     console.log(index);
//     // console.log("todo", todos.filter((v, i) => i !== index));
//     // todos.filter((v, i) => i !== index)
//     todos.splice(index,1);
//     setTodos([...todos]);
//     console.log(todos); 
// } 

const deleteTodo = async(key) => {
    // console.log(key);
    const dbRef = doc(db, "todos", key);
    await deleteDoc(dbRef);
    // setRefresh(!refresh); 
} 

// const deleteAll = () => {
//     setTodos([]);
// }

const deleteAll = async () => {
    await todos.forEach((todo)=>{
        deleteDoc(doc(db, "todos", todo.key));
        // setRefresh(!refresh);
    });
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
                            <input type="text"defaultValue={v.todo} onChange={(e) => setUpdatedValue(e.target.value)} autoFocus />
                            <button id="update" onClick={()=>updateToDo(v.key)}>Update</button> 
                            <button id="cancel" onClick={cancelTodo}>Cancel</button>
                        </div>
                        ) : (
                        <div key={i} className="task">
                            <li>{v.todo}</li>
                            <button id="edit" onClick={()=>setIndexValue(i)}>Edit</button> 
                            <button id="delete" onClick={()=>deleteTodo(v.key)} >Delete</button>
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


