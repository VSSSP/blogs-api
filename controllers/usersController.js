const jwt = require('jsonwebtoken');
const usersService = require('../services/usersService');
// require('dotenv').config();

// const { JWS_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const getAll = async (_req, res) => {
  const users = await usersService.getAll();
  res.status(users.code).json(users.users);
};

const createUser = async (req, res) => {
  const user = await usersService.createUser(req.body);
  const token = jwt.sign({ data: req.body }, 'JWT_SECRET', jwtConfig);
  res.status(user.code).json({ token });
};

const login = async (req, res) => {
  const token = jwt.sign({ data: req.body }, 'JWT_SECRET', jwtConfig);
  res.status(200).json({ token });
};

const getUserById = async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
  res.status(user.code).json(user.user);
};

module.exports = {
  getAll,
  createUser,
  login,
  getUserById,
};