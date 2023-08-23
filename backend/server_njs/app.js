const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const mainRoute = require('./routers/mainRoute');
const loginRoute = require('./routers/loginRoute');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());
app.use(cors());

app.use('/', mainRoute);
app.use('/login', loginRoute);

module.exports = app;