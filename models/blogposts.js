module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
    },
    published: {
      type: DataTypes.DATE,
    },
    updated: { type: DataTypes.DATE },
  });
  return BlogPosts;
};