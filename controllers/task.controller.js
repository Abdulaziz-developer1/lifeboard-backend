const Task = require("../models/task.model");

exports.getAll = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

exports.getById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
};

exports.create = async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
};

exports.update = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.delete = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted ✅" });
};
