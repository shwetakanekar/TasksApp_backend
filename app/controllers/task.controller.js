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
