const Todo = require("../models/Todo");

// get todo
exports.getTodos = async () => {
  return await Todo.find();
};

// create todo
exports.createTodo = async (data) => {
  return await Todo.create(data);
};

// update todo
exports.updateTodo = async (id, data) => {
  return await Todo.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// delete todo
exports.deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

// search todo
exports.searchTodo = async (keyword) => {
  return await Todo.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
  });
};

// update todo
exports.updateStatus = async (id, status) => {
  return await Todo.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};