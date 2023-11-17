const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const evil = require('./config/evil');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // 黑名单
  if (evil.EvilIps.includes(req.ip)) {
    res.status(401).send('not allowed');
  }
  console.log('Hello from the middleware 👋');
  next();
});
app.use((req, res, next) => {
  console.log(
    '🚀-----time',
    `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()} 请求url:${
      req.url
    } id=${req.ip}`
  );
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(function(req, res, next) {
  const filePath = path.join(__dirname, 'static', req.url);
  fs.stat(filePath, function(err, exists) {
    if (exists) {
      res.sendFile(filePath);
    } else {
      next();
    }
  });
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
