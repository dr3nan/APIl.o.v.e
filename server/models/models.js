import DataTypes from 'sequelize';
import sequelize from './index.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

const House = sequelize.define('House', {
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.hasMany(House, { foreignKey: 'userId' });
House.belongsTo(User, { foreignKey: 'userId' });

async function synchronize() {
  await User.sync();
  await House.sync();
};

synchronize();

export { User, House };