require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

const errorHandler = require('./middlewares/errorHandler.js');

const router = require('./routes/index.js');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('USERS listen on port :', PORT);
});

module.exports = app;
