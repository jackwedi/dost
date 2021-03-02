const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})