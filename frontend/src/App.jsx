// React hooks import kiye hain state aur lifecycle handle karne ke liye
import { useEffect, useState } from "react";

// Backend API se data fetch karne ke liye axios use kiya hai
import axios from "axios";

import "./App.css";

// Backend API ka base 

const API = "https://tutedude-code.onrender.com/api/todos";

function App() {

// Sare todos store karne ke liye state
const [todos, setTodos] = useState([]);

// Input field ka value store karne ke liye
const [title, setTitle] = useState("");

// Search input ka value store karne ke liye
const [search, setSearch] = useState("");

// Loading state API call ke time show karne ke liye
const [loading, setLoading] = useState(false);

// Backend se sare todos fetch karne ka function
const fetchTodos = async () => {
try {
setLoading(true);


  const res = await axios.get(API);

  // API se aaya hua data state me save kar diya
  setTodos(res.data);
} catch (error) {
  console.log(error);
} finally {
  setLoading(false);
}

};

// Component load hote hi todos fetch honge
useEffect(() => {
fetchTodos();
}, []);

// Naya todo add karne ka function
const addTodo = async () => {


// Empty task add na ho isliye validation
if (!title.trim()) return;

try {
  await axios.post(API, {
    title,
  });

  // Input field clear kar diya
  setTitle("");

  // Naya data fetch kar liya
  fetchTodos();
} catch (error) {
  console.log(error);
}

};

// Todo delete karne ka function
const deleteTodo = async (id) => {
try {
await axios.delete(`${API}/${id}`);


  fetchTodos();
} catch (error) {
  console.log(error);
}

};

// Existing todo edit karne ka function
const editTodo = async (id, oldTitle) => {


// Prompt box me purana title show hoga
const newTitle = prompt(
  "Edit Task",
  oldTitle
);

if (!newTitle) return;

try {
  await axios.put(`${API}/${id}`, {
    title: newTitle,
  });

  fetchTodos();
} catch (error) {
  console.log(error);
}


};

// Pending aur Completed status toggle karne ka function
const toggleStatus = async (todo) => {


const status =
  todo.status === "Pending"
    ? "Completed"
    : "Pending";

try {
  await axios.patch(
    `${API}/${todo._id}/status`,
    { status } 
  );

  fetchTodos();
} catch (error) {
  console.log(error);
}

};

// Search ke according tasks filter karne ke liye
const filteredTodos = todos.filter((todo) =>
todo.title
.toLowerCase()
.includes(search.toLowerCase())
);

// Completed tasks count nikalne ke liye
const completedTasks = todos.filter(
(todo) => todo.status === "Completed"
).length;

// Pending tasks count nikalne ke liye
const pendingTasks = todos.filter(
(todo) => todo.status === "Pending"
).length;

return ( <div className="container">


  {/* Application Heading */}
  <div className="header">
    <h1>🚀 Todo Management App</h1>
  </div>

  {/* Search aur Add Todo Section */}
  <div className="card">

    {/* Search Input */}
    <input
      type="text"
      placeholder="Search Task..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

    {/* New Task Input */}
    <input
      type="text"
      placeholder="Enter Task..."
      value={title}
      onChange={(e) =>
        setTitle(e.target.value)
      }
    />

    {/* Add Todo Button */}
    <button
      className="add-btn"
      onClick={addTodo}
    >
      Add Task
    </button>
  </div>

  {/* Todo Statistics */}
  <div className="stats">
    <div>Total: {todos.length}</div>
    <div>Completed: {completedTasks}</div>
    <div>Pending: {pendingTasks}</div>
  </div>

  {/* Loading State */}
  {loading ? (
    <h2>Loading...</h2>
  ) : filteredTodos.length === 0 ? (

    // Agar koi task na mile
    <h2>No Tasks Found</h2>

  ) : (

    // Todo List Render Karna
    filteredTodos.map((todo) => (
      <div
        className="todo-card"
        key={todo._id}
      >
        {/* Todo Title */}
        <h3>{todo.title}</h3>

        {/* Todo Status */}
        <p>
          Status:
          <span
            className={
              todo.status ===
              "Completed"
                ? "completed"
                : "pending"
            }
          >
            {todo.status}
          </span>
        </p>

        {/* Action Buttons */}
        <div className="btn-group">

          {/* Edit Button */}
          <button
            className="edit-btn"
            onClick={() =>
              editTodo(
                todo._id,
                todo.title
              )
            }
          >
            Edit
          </button>

          {/* Status Toggle Button */}
          <button
            className="status-btn"
            onClick={() =>
              toggleStatus(todo)
            }
          >
            {todo.status ===
            "Pending"
              ? "Complete"
              : "Undo"}
          </button>

          {/* Delete Button */}
          <button
            className="delete-btn"
            onClick={() =>
              deleteTodo(todo._id)
            }
          >
            Delete
          </button>

        </div>
      </div>
    ))
  )}
</div>


);
}

export default App;
