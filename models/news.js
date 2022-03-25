const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  News.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    tags: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};
