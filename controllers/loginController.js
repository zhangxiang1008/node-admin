const jsonWebToken = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/jwt');

const login = (req, res) => {
  const { body } = req;
  if (body.username === 'zx' && body.password === '123456') {
    const token = jsonWebToken.sign(
      {
        //exp 的值是一个时间戳，这里表示 1h 后 token 失效
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        userId: body.username,
        role: 'admin'
      },
      SECRET_KEY
    );
    res.status(200).json({
      status: 'success',
      data: token
    });
  } else {
    res.status(403).json({ status: 'error', data: '登陆失败' });
  }
};

module.exports = { login };
