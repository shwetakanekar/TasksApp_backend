const db = require('../models');
const Task = db.task;

exports.createTask = async (taskData) => await Task.create(taskData);

exports.getAllTasks = async () => await Task.findAll();

exports.getTask = async (id) =>
  await Task.findOne({
    where: { id },
  });

exports.editTask = async (id, taskData) =>
  await Task.update(taskData, {
    where: { id },
  });

exports.deleteTask = async (id) =>
  await Task.destroy({
    where: { id },
  });
