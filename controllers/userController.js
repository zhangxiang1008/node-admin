const boy = require('../models/Boy');

exports.getAllUsers = async (req, res) => {
  try {
    const data = await boy.all();
    res.status(200).json({
      status: 'success',
      data: data
    });
  } catch (e) {
    res.status(200).json({
      status: 'error',
      data: JSON.stringify(e)
    });
  }
};
exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const row = await boy.one(id);
    res.status(200).json({
      status: 'success',
      data: row
    });
  } catch (e) {
    res.status(500).json({
      status: 'error',
      data: e
    });
  }
};
exports.createUser = async (req, res) => {
  try {
    const data = await boy.insert(req.body);
    res.status(200).json({
      status: 'success',
      data: data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: error
    });
  }
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
