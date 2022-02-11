module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: { type: DataTypes.INTEGER },
    published: { type: DataTypes.DATE },
    updated: { type: DataTypes.DATE } }, { timestamps: false });
  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId' });
    BlogPosts.hasMany(models.Category, {
      as: 'categories',
      foreignKey: 'id' });
  };
  return BlogPosts;
};