module.exports = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
  }, { timestamps: false });
  PostsCategories.associate = (models) => {
    PostsCategories.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: 'PostCategory',
      foreignKey: 'postId',
    });
    PostsCategories.belongsToMany(models.Category, {
      as: 'categories',
      through: 'PostCategory',
      foreignKey: 'categoryId' });
  };
  return PostsCategories;
};