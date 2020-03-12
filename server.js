const express = require('express');

const userRouter = require('./users/userRouter.js');



//define middleware
const server = express();
server.use(logger);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  // console.log(req);
  const method = req.method;
  const url = req.url;
  const timestamp = req.timestamp;

  console.log(`${method}, ${url}, ${timestamp}`);
  next();
}



module.exports = server;
