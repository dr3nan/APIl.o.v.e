import { Sequelize } from 'sequelize';

const config = {
  host: 'localhost',
  dialect: 'postgres'
};

const sequelize = new Sequelize('users', 'dr3nan', '', config);

try {
  sequelize.authenticate();
  console.log('connected to db');
} catch (error) {
  console.log(error);
}

export default sequelize;
