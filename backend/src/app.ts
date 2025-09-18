import type Request = require("express");
import type e = require("express");
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
dotenv.config();
const app = express();
app.use(express.json());
app.get('/', (req:Request, res:e.Response) => {
    res.send('SweetApiWorkingFine');
});
app.use('/api/auth', authRoutes);
module.exports = app;