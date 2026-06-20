
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    try {
      await axios.post(API, {
        title,
      });

      setTitle("");
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (id, oldTitle) => {
    const newTitle = prompt("Edit Task", oldTitle);

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

  const filteredTodos = todos.filter((todo) =>
    todo.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const completedTasks = todos.filter(
    (todo) => todo.status === "Completed"
  ).length;

  const pendingTasks = todos.filter(
    (todo) => todo.status === "Pending"
  ).length;

  return (
    <div className="container">
      <div className="header">
        <h1>🚀 Todo Management App</h1>
      </div>

      <div className="card">
        <input
          type="text"
          placeholder="Search Task..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Enter Task..."
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <button
          className="add-btn"
          onClick={addTodo}
        >
          Add Task
        </button>
      </div>

      <div className="stats">
        <div>Total: {todos.length}</div>
        <div>Completed: {completedTasks}</div>
        <div>Pending: {pendingTasks}</div>
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : filteredTodos.length === 0 ? (
        <h2>No Tasks Found</h2>
      ) : (
        filteredTodos.map((todo) => (
          <div
            className="todo-card"
            key={todo._id}
          >
            <h3>{todo.title}</h3>

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
                {" "}
                {todo.status}
              </span>
            </p>

            <div className="btn-group">
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