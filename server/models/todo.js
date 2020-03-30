'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model { }

  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        customValidator(value) {
          let date = new Date()
          if (value < date.getTime) {
            throw new Error(`The Date must be Bigger or Equal Today Date`)
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, { sequelize })

  // const Todo = sequelize.define('Todo', {
  // }, {});
  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};