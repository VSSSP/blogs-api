const { User } = require('../models');

const displayNameValidation = (displayName) => {
  if (displayName.length < 8) {
    return {
      code: 400,
      message: '"displayName" length must be at least 8 characters long',
    };
  }
  return false;
};

const emailValidation = (email) => {
  if (!email) {
    return {
      code: 400,
      message: '"email" is required',
    };
  }
  const emailCheck = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const emailValidator = emailCheck.test(email);
  if (!emailValidator) {
    return {
      code: 400,
      message: '"email" must be a valid email',
    };
  }
  return false;
};

const passwordValidation = (password) => {
  if (!password) {
    return {
      code: 400,
      message: '"password" is required',
    };
  }
  if (password.length < 6) {
    return {
      code: 400,
      message: '"password" length must be 6 characters long',
    };
  }
  return false;
};

const verifyIfEmailExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return {
      code: 409,
      message: 'User already registered',
    };
  }
  return false;
};

module.exports = {
  displayNameValidation,
  emailValidation,
  passwordValidation,
  verifyIfEmailExists,
};