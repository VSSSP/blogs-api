const blogPostsSchema = require('../schemas/blogPostsSchema');

const validateTitle = (req, res, next) => {
  const validTitle = blogPostsSchema.titleValidation(req.body);
  if (validTitle) {
    return res.status(validTitle.code).json({ message: validTitle.message });
  }
  next();
};

const validateContent = (req, res, next) => {
  const validContent = blogPostsSchema.contentValidation(req.body);
  if (validContent) {
    return res.status(validContent.code).json({ message: validContent.message });
  }
  next();
};

const validateCategoryIds = async (req, res, next) => {
  const validCategoryIds = await blogPostsSchema.categoryIdsValidation(req.body);
  if (validCategoryIds) {
    return res.status(validCategoryIds.code).json({ message: validCategoryIds.message });
  }
  next();
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryIds,
};
