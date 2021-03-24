const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 1337;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to MONGODB");
});

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const groupRouter = require('./routes/group');
app.use('/group', groupRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})