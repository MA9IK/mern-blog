const { body } = require('express-validator');

const registerValidator = [
  body('username', 'Username must be at least 3 characters')
    .trim()
    .isLength({ min: 3, max: 20 }),
  body('password', 'Password must be at least 6 characters').isLength({
    min: 6
  })
];

module.exports = {
  registerValidator
};
