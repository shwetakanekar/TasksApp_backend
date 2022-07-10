const db = require('../models');
const Task = db.task;

exports.createTask = async (taskData) => {
  const task = await Task.create(taskData);
  return task;
};

exports.getAllTasks = async () => {
  const tasks = await Task.findAll();
  return tasks;
};

exports.getTask = async (id) => {
  const task = await Task.findOne({
    where: { id },
  });
  return task;
};
