const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  const environment = process.env;
  const port = process.env.PORT || 4000;
  res.status(200).json({api: "up", port, environment });
});

//custom middleware

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl}`);
  next();
}

module.exports = server;
