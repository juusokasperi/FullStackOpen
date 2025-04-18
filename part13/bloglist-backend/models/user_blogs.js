const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db').default;

class UserBlogs extends Model {}

UserBlogs.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
}, {
  sequelize,
  timestamps: false,
  underscored: true,
  modelName: 'user_blogs'
});

module.exports = UserBlogs;
