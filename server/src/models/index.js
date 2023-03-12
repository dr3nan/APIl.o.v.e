import { Sequelize } from 'sequelize';
const USER_NAME = process.env.SEQUEL_USER_NAME;
const USER_PASSWORD = process.env.SEQUEL_USER_PASSWORD;

const config = {
  host: 'localhost',
  dialect: 'postgres'
};

const sequelize = new Sequelize('users', USER_NAME, USER_PASSWORD, config);

try {
  sequelize.authenticate();
  console.log('connected to db');
} catch (error) {
  console.log(error);
}

export default sequelize;
