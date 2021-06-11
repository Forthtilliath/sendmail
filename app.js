const express     = require('express');
const helmet      = require('helmet');
const nocache     = require('nocache');
const compression = require('compression');
const app         = express();

const router  = express.Router();

const mailRoutes = require('./routes/mail');

const headers = require('./middleware/header');
const apiLimiter = require('./middleware/apiLimiter');

// Middlewares
app.use(apiLimiter);
app.use(compression());
app.use(helmet());
app.use(headers());
app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
router.use('/mail', mailRoutes);

app.use('/api', router);

module.exports = app;
