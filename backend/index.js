const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to MONGODB");
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const groupsRouter = require('./routes/groups');
app.use('/groups', groupsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})