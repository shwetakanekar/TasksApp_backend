const taskService = require('../services/task.service');

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).send({
      message: 'Title and description is required.',
    });
  }

  const taskData = {
    title,
    description,
  };

  try {
    await taskService.createTask(taskData);
    return res.status(201).send({
      message: 'Task was created.',
    });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    return res.status(500).send({
      message: 'Error occurred while creating task.',
      error: e.message,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    return res.status(200).send({ tasks });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    return res.status(500).send({
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
      return res.status(200).send({ task });
    }
    return res.status(404).send({
      message: 'Task not found.',
    });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    return res.status(500).send({
      message: 'Error occurred while fetching task.',
      error: e.message,
    });
  }
};

exports.editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (!title || !description || status == null) {
    return res.status(400).send({
      message: 'Parameters in request body are missing.',
    });
  }

  const taskData = { title, description, status };

  try {
    const updatedTaskCount = await taskService.editTask(id, taskData);

    if (updatedTaskCount[0]) {
      return res.status(200).send({
        message: 'Task was updated.',
      });
    }
    return res.status(404).send({
      message: 'Task not found.',
    });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    return res.status(500).send({
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
      return res.status(200).send({
        message: 'Task was deleted.',
      });
    }
    return res.status(404).send({
      message: 'Task not found.',
    });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    return res.status(500).send({
      message: 'Error occurred while deleting task.',
      error: e.message,
    });
  }
};
