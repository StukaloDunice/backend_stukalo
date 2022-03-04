const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: 'id',
        foreignKey: 'userId',
      });
    }
  }
  News.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    tags: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};
