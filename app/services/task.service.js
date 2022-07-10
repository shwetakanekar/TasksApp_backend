const db = require('../models');
const Task = db.task;

exports.createTask = async (taskData) => {
  const task = await Task.create(taskData);
  return task;
};
