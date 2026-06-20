const express = require("express");

const router = express.Router();

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  searchTodo,
  updateStatus,
} = require("../controllers/todoController");

// routing karne ke liye 
router.get("/", getTodos);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

router.get("/search/task", searchTodo);

router.patch("/:id/status", updateStatus);

module.exports = router;