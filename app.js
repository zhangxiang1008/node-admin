const express = require('express');
const morgan = require('morgan');

const jwt = require('express-jwt');

const evil = require('./config/evil');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const loginRouter = require('./routes/loginRouter');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

app.use(express.json());
const SECRET_KEY = 'kite1874';

app.use(
  jwt.expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] }).unless({
    path: ['/api/v1/login', /^\/static\/.*/]
  })
);
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('干嘛呢？你想硬闯？！');
  }
});
app.use('/static', express.static(`${__dirname}/static`));

app.use((req, res, next) => {
  // 黑名单
  if (evil.EvilIps.includes(req.ip)) {
    res.status(401).send('not allowed');
  }
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/login', loginRouter);

app.use(function(err, req, res, next) {
  // 记录错误
  console.error(err);
  // 继续到下一个错误处理中间件
  next(err);
});
app.use(function(err, req, res, next) {
  // 设置状态码为500
  res.status(500);
  // 发送错误信息
  res.send('Internal server error.');
});

module.exports = app;
