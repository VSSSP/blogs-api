module.exports = (sequelize, DataTypes) => {
  const postCategories = sequelize.define('postCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tablename: 'PostsCategories' }, { timestamps: false });
  postCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: 'postCategory',
      foreignKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: 'postCategory',
      foreignKey: 'postId' });
  };
  return postCategories;
};