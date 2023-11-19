const express = require('express');
const morgan = require('morgan');

const jwt = require('express-jwt');

const jsonWebToken = require('jsonwebtoken');

const evil = require('./config/evil');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

app.use(express.json());
const SECRET_KEY = 'kite1874';

const token = jsonWebToken.sign(
  {
    //exp 的值是一个时间戳，这里表示 1h 后 token 失效
    exp: Math.floor(Date.now() / 1000) + 2 * 60,
    userId: 122,
    role: 'admin'
  },
  SECRET_KEY
);
console.log('---token', token);

app.use(
  jwt.expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] }).unless({
    path: ['/auth/adminLogin', /^\/static\/.*/]
  })
);
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('干嘛呢？你想硬闯？！');
  }
});
app.use('/static', express.static(`${__dirname}/static`));

// app.use(function(req, res, next) {
//   const filePath = path.join(__dirname, 'static', req.url);
//   fs.stat(filePath, function(err, exists) {
//     if (exists) {
//       res.sendFile(filePath);
//     } else {
//       next();
//     }
//   });
// });

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
