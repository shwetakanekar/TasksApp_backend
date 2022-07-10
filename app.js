require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./app/models');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(() => {
    console.log('Unable to connect to the database:', error);
  });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tasks API.' });
});

require('./app/routes/task.route')(app);

// set port to listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
