const redis = require('redis');

const client = redis.createClient();

client.on('connect', function() {
  console.log('成功连接到 Redis 服务器');
});

client.on('error', function(error) {
  console.error('连接 Redis 服务器时发生错误:', error);
});

module.exports = client;
