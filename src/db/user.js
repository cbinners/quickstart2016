module.exports = (sequelize, DataTypes) => {
  const name = 'User';

  const properties = {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
  };

  const config = {
    classMethods: {
      associate: (models) => {
        // Associations go here
      }
    },
    scopes: {
      client: {
        attributes: ['id', 'email']
      }
    }
  };

  return sequelize.define(name, properties, config);
};
