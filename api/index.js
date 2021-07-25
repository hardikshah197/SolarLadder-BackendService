const cors = require('cors');
const express = require('express');
const app = express();
const itemRoutes = require('../routes/itemRoutes');
const inventryRoutes = require('../routes/inventryRoutes');
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
app.use(express.json());

app.use('/api',[itemRoutes,inventryRoutes]);

module.exports = app;