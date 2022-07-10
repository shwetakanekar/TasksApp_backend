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
    });
  }
};
