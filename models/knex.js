// 引用配置文件
const configs = require('../config/mysql');
const Knex = require('knex');

// 把配置文件中的信息，设置在初始化配置中
module.exports = Knex({
  client: 'mysql',
  connection: {
    host: configs.host,
    port: configs.port,
    user: configs.user,
    password: configs.password,
    database: configs.database
  },
  // 打印错误
  log: {
    error(message) {
      console.log('[knex error]', message);
    }
  }
});
