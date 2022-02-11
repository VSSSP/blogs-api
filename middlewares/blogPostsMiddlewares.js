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

const validatePostId = async (req, res, next) => {
  const { id } = req.params;
  const validPostId = await blogPostsSchema.postIdValidation(id);
  if (validPostId) {
    return res.status(validPostId.code).json({ message: validPostId.message });
  }
  next();
};

const validateUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const validUser = await blogPostsSchema.userValidation(authorization, id);
  if (validUser) {
    return res.status(validUser.code).json({ message: validUser.message });
  }
  next();
};

const validateCategory = async (req, res, next) => {
  const validCategory = await blogPostsSchema.categoriesValidation(req.body);
  if (validCategory) {
    return res.status(validCategory.code).json({ message: validCategory.message });
  }
  next();
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryIds,
  validatePostId,
  validateUser,
  validateCategory,
};
