const Todo = require("../models/Todo");

exports.getTodos = async () => {
  return await Todo.find();
};

exports.createTodo = async (data) => {
  return await Todo.create(data);
};

exports.updateTodo = async (id, data) => {
  return await Todo.findByIdAndUpdate(id, data, {
    new: true,
  });
};

exports.deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

exports.searchTodo = async (keyword) => {
  return await Todo.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
  });
};

exports.updateStatus = async (id, status) => {
  return await Todo.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};