import axios from "axios";

const API =
  "http://localhost:5000/api/todos";

export const getTodos = () =>
  axios.get(API);

export const createTodo = (data) =>
  axios.post(API, data); 

export const deleteTodo = (id) =>
  axios.delete(`${API}/${id}`);

export const updateTodo = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const updateStatus = (id, status) =>
  axios.patch(`${API}/${id}/status`, {
    status,
  });

export const searchTodo = (keyword) =>
  axios.get(
    `${API}/search/task?keyword=${keyword}`
  );