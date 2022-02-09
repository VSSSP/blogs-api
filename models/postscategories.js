module.exports = (sequelize, DataTypes) => {
  const postCategories = sequelize.define('postCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tablename: 'PostsCategories',
  });
  return postCategories;
};