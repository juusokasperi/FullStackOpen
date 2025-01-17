const express = require('express');
require('express-async-errors');
const app = express();
const logger = require('./util/logger');
const middleware = require('./util/middleware');
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db').default;

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorsRouter = require('./controllers/authors');
const readingsRouter = require('./controllers/readings');

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readingsRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

const start = async() => {
  await connectToDatabase();
  app.listen(PORT, () => {
    logger.info(`Server running on ${PORT}`);
  });
};

start();
