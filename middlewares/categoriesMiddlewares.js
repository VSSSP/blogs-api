const categoriesSchema = require('../schemas/categoriesSchema');

const validateName = (req, res, next) => {
  const validName = categoriesSchema.nameValidation(req.body);
  if (validName) {
    return res.status(validName.code).json({ message: validName.message });
  }
  next();
};

module.exports = {
  validateName,
};