import React, { useState } from 'react';
import './App.css';


function App(){

  const [todo, setTodo] = useState("");
  const [todoArr, setTodoArr] = useState([]);
  const [editId, setEdit] = useState(0);
 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId){
      const editTodo = todoArr.find((i) => i.id === editId);
      const updateTodos = todoArr.map((t)=>
        t.id === editTodo.id
        ? (t={id:t.id, todo})
        : {id:t.id, todo:t.todo}
      );

      setTodoArr(updateTodos);
      setEdit(0);
      setTodo("");
      return;
    }

    if (todo !== ""){
      setTodoArr([{id:`${todo}-${Date.now()}`, todo }, ...todoArr]);
      setTodo("");
      
    }
    
  };
  
  const handleDelete = (id) => {
    const delTodo = todoArr.filter((to) => to.id !== id);
    setTodoArr([...delTodo]);
  };
  
  const handleEdit = (id) => {
    const editTodo = todoArr.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEdit(id);

  };
   

  return(
    <div className='App'>
     <div className='Container'>
        <h1>Todo List</h1>
        <form className='todoForm' onSubmit={handleSubmit} >
        <input type="text" value={todo}
        onChange={(e)=>setTodo(e.target.value)}/>
        
        <button type='Submit'>{editId ? "Edit" : "Go"}</button>
        </form>

        <ul className='allTodos'>
          {todoArr.map((t) => (
            <li className='singleTodo'>
              <span className='todoText' key={t.id}>
                {t.todo}
              </span>
            <button onClick={() => handleEdit(t.id)}>Edit</button>
            <button onClick={() => handleDelete(t.id)}>Delete</button>
            
            </li>
          ))

          }
         
        </ul>
      </div>
    </div>
  );
};

// export default {App, Keyarr};
export default App;
