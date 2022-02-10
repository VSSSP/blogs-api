const usersSchema = require('../schemas/usersSchema');

const validateDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  const validDisplayName = usersSchema.displayNameValidation(displayName);
  if (validDisplayName) {
  return res.status(validDisplayName.code).json({ message: validDisplayName.message });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validEmail = usersSchema.emailValidation(email);
  if (validEmail) return res.status(validEmail.code).json({ message: validEmail.message });
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const validPassword = usersSchema.passwordValidation(password);
  if (validPassword) return res.status(validPassword.code).json({ message: validPassword.message });
  next();
};

const validateExistingEmail = async (req, res, next) => {
  const { email } = req.body;
  const validEmail = await usersSchema.verifyIfEmailExists(email);
  if (validEmail) return res.status(validEmail.code).json({ message: validEmail.message });
  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const firstValidation = usersSchema.loginFirstValidation(email, password);
  if (firstValidation) {
    return res.status(firstValidation.code).json({ message: firstValidation.message });
  }
  const secondValidation = usersSchema.loginSecondValidation(email, password);
  if (secondValidation) {
    return res.status(secondValidation.code).json({ message: secondValidation.message });
  }
  const thirdValidation = await usersSchema.loginThirdValidation(email, password);
  if (thirdValidation) {
    return res.status(thirdValidation.code).json({ message: thirdValidation.message });
  }
  next();
};

const validateToken = (req, res, next) => {
  const validToken = usersSchema.tokenValidation(req.headers.authorization);
  if (validToken) {
    return res.status(validToken.code).json({ message: validToken.message });
  }
  next();
};

const validateUserId = async (req, res, next) => {
  const validId = await usersSchema.verifyIfUserExistsById(req.params.id);
  if (validId) {
    return res.status(validId.code).json({ message: validId.message });
  }
  next();
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateExistingEmail,
  validateLogin,
  validateToken,
  validateUserId,
};