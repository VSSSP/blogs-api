module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  return user;
};