const jwt = require('jsonwebtoken');
const { User } = require('../models');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

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
    // https://github.com/tryber/sd-014-a-project-talker-manager/pull/48/files
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

const loginFirstValidation = (email, password) => {
  if (email === undefined) {
    return {
      code: 400,
      message: '"email" is required',
    };
  }
  if (password === undefined) {
    return {
      code: 400,
      message: '"password" is required',
    };
  }
  return false;
};

const loginSecondValidation = (email, password) => {
  if (email.length === 0) {
    return { code: 400, message: '"email" is not allowed to be empty' };
  } 
  if (password.length === 0) {
    return { code: 400, message: '"password" is not allowed to be empty' };
  }
  return false;
};

const loginThirdValidation = async (email, password) => {
  const userEmail = await User.findOne({ where: { email } });
  const userPassword = await User.findOne({ where: { password } });
  if (!userEmail || !userPassword) {
    return {
      code: 400,
      message: 'Invalid fields',
    };
  }
  return false;
};

const tokenValidation = (token) => {
  if (!token) return { code: 401, message: 'Token not found' };
  try { 
    jwt.verify(token, 'JWT_SECRET', jwtConfig);
    return false;
  } catch (error) {
    return {
      code: 401,
      message: 'Expired or invalid token',
    };
  }
};

module.exports = {
  displayNameValidation,
  emailValidation,
  passwordValidation,
  verifyIfEmailExists,
  loginFirstValidation,
  loginSecondValidation,
  loginThirdValidation,
  tokenValidation,
};