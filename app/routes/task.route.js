module.exports = (app) => {
  const taskController = require('../controllers/task.controller');
  const router = require('express').Router();

  app.use('/api/tasks', router);

  router.post('/', taskController.createTask);

  router.get('/', taskController.getAllTasks);
};
