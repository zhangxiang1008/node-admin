const Base = require('./Base');

class Boy extends Base {
  // 定义参数默认值为 user 表
  constructor(props = 'boys') {
    super(props);
  }
}

module.exports = new Boy();
