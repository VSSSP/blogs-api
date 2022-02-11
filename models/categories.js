module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  },
  { timestamps: false });
  categories.associate = (models) => {
    categories.hasMany(models.PostCategory, {
      as: 'PostsCategories',
      foreignKey: 'categoryId',
    });
  };
  return categories;
};