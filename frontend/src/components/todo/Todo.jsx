import React, { useState, useEffect } from 'react';
import './todo.css';
import axios from 'axios';
import Navbar from '../navbar/navbar';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/get-tasks')
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Network error");
      });
  }, []);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleAddTask(event) {
    event.preventDefault();
    if (newTask.trim() !== '') {
      const data = { title: newTask.trim() };
      axios.post('http://localhost:5000/post-tasks', data)
        .then((res) => {
          setTasks([...tasks, res.data]);
          setNewTask('');
        })
        .catch((error) => {
          console.error(error);
          alert("Network error");
        });
    }
  }

  function handleTaskCompletion(taskId, isCompleted) {
    const data = { completed: isCompleted };
    axios.patch(`http://localhost:5000/patch-tasks/${taskId}`, data)
      .then((res) => {
        setTasks(tasks.map((task) => {
          if (task._id === res.data._id) {
            task.completed = res.data.completed;
          }
          return task;
        }));
      })
      .catch((error) => {
        console.error(error);
        alert("Network error");
      });
  }

  function handleTaskDeletion(taskId) {
    axios.delete(`http://localhost:5000/delete-tasks/${taskId}`)
      .then((res) => {
        setTasks(tasks.filter((task) => task._id !== res.data._id));
      })
      .catch((error) => {
        console.error(error);
        alert("Network error");
      });
  }

  return (
    <>
    <Navbar />
    <div className="todo-list">
      
      <h1>To Do List</h1>
      <div className="add-task">
        <input type="text" id='task' value={newTask} onChange={handleInputChange} placeholder="Add a task..." />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <label>
              
              <span>{task.title}</span>
            </label>
            <button onClick={() => handleTaskDeletion(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default TodoList;






























// import React, { useState, useEffect } from 'react';
// import './todo.css';
// import axios from "axios";
// import Navbar from '../navbar/navbar';
// import Footer from '../footer/Footer';

// function Todo() {
//   const [todos, setTodos] = useState([]);
//   const [inputValue, setInputValue] = useState('');



//   useEffect(() => {
//     axios.get("http://localhost:5000/gettask").then((arr) => setTodos(arr.data));
//   }, []);
//   const submitHandler = (e) => {
//     e.preventDefault();
//     setInputValue("");
//     axios
//       .post("http://localhost:5000/addtask", { todo: inputValue })
//       .then((arr) => setTodos(arr.data));
//   };
//   const deleteHandler = (id) => {
//     axios
//       .delete(`http://localhost:5000/delete/${id}`)
//       .then((arr) => setTodos(arr.data));
//   };

//   return (
//     <>
//       <Navbar/>
//     <div className="App">
//       <div className='todo-container'>
//       <h1>Todo List</h1>
//       <div>
//       <form onSubmit={submitHandler}>
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//           <input id='Add-button' type="submit" value="Add" />
//           <br />    
//           <br />
//         </form>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Task</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {todos.map((task) => (
//             <tr key={task._id}>
//               <td>{task.ToDo}</td>
//               <td>
//                 <button onClick={() => deleteHandler(task._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// }

// export default Todo;
