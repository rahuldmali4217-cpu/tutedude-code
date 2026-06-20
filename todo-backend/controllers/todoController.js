const todoService = require("../services/todoService");

// get todo
exports.getTodos = async (req, res, next) => {
  try {
    const todos = await todoService.getTodos();

    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// todo create karne ke liye
exports.createTodo = async (req, res, next) => {
  try {
    const todo = await todoService.createTodo(req.body);

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

// todo update karne ke liye
exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await todoService.updateTodo(
      req.params.id,
      req.body
    );

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

// todo delete karne ke liye
exports.deleteTodo = async (req, res, next) => {
  try {
    await todoService.deleteTodo(req.params.id);

    res.status(200).json({
      message: "Todo Deleted",
    });
  } catch (error) {
    next(error);
  }
};

// todo search karne ke liye
exports.searchTodo = async (req, res, next) => {
  try {
    const result = await todoService.searchTodo(
      req.query.keyword
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


// todo update karne ke liye 
exports.updateStatus = async (req, res, next) => {
  try {
    const todo = await todoService.updateStatus(
      req.params.id,
      req.body.status
    );

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};