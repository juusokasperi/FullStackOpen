const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db').default;

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'user',
  defaultScope: { where: { disabled: false } },
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['passwordHash'] },
    },
    getAll: { where: {} },
  },
});

module.exports = User;
