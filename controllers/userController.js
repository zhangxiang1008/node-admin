const sqlConnetor = require('../config/mysql');

exports.getAllUsers = (req, res) => {
  sqlConnetor.query('select * from boys1', (err, rows, fields) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        data: err
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: rows
    });
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
