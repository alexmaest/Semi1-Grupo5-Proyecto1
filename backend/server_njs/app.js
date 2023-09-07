const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

const mainRoute = require('./routers/mainRoute');
const loginRoute = require('./routers/loginRoute');
const registerRoute = require('./routers/registerRoute');
const adminRoute = require('./routers/adminRoute');
const profileRoute = require('./routers/profileRoute');
const playlistRoute = require('./routers/playlistRoute');

//middleware
app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());
app.use(cors());

app.use('/', mainRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/admin', adminRoute);
app.use('/profile', profileRoute);
app.use('/playlist', playlistRoute);

module.exports = app;