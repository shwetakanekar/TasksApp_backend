const taskService = require('../services/task.service');
const status = require('http-status');

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(status.BAD_REQUEST).send({
      message: 'Title and description is required.',
    });
  }

  const taskData = {
    title,
    description,
  };

  try {
    await taskService.createTask(taskData);
    return res.status(status.CREATED).send({
      message: 'Task was created.',
    });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    return res.status(status.INTERNAL_SERVER_ERROR).send({
      message: 'Error occurred while creating task.',
      error: e.message,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    return res.status(status.OK).send({ tasks });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    return res.status(status.INTERNAL_SERVER_ERROR).send({
      message: 'Error occurred while fetching tasks.',
      error: e.message,
    });
  }
};

exports.getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskService.getTask(id);
    if (task) {
      return res.status(status.OK).send({ task });
    }
    return res.status(status.NOT_FOUND).send({
      message: 'Task not found.',
    });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    return res.status(status.INTERNAL_SERVER_ERROR).send({
      message: 'Error occurred while fetching task.',
      error: e.message,
    });
  }
};

exports.editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (!title || !description || status == null) {
    return res.status(status.BAD_REQUEST).send({
      message: 'Parameters in request body are missing.',
    });
  }

  const taskData = { title, description, status };

  try {
    const updatedTaskCount = await taskService.editTask(id, taskData);

    if (updatedTaskCount[0]) {
      return res.status(status.OK).send({
        message: 'Task was updated.',
      });
    }
    return res.status(status.NOT_FOUND).send({
      message: 'Task not found.',
    });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    return res.status(status.INTERNAL_SERVER_ERROR).send({
      message: 'Error occurred while updating task.',
      error: e.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTaskCount = await taskService.deleteTask(id);
    if (deletedTaskCount) {
      return res.status(status.OK).send({
        message: 'Task was deleted.',
      });
    }
    return res.status(status.NOT_FOUND).send({
      message: 'Task not found.',
    });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    return res.status(status.INTERNAL_SERVER_ERROR).send({
      message: 'Error occurred while deleting task.',
      error: e.message,
    });
  }
};
