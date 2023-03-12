import express from 'express';
// we would use cors if we were using a frontend, not needed for this project

// we import the sequelize instance to be able to connect and syncronise the db
import sequelize from './src/models/index.js';

// we import the router from the router.js file where our endpoints are defined
import router from './router.js';

// we would also use a cookie parser if we were using cookies for authentication for instance

const PORT = 4000;

const app = express();

// we .json() as bodyarser middleware to be able to parse the body of the requests
app.use(express.json());
app.use(router);

// this function will be called when we run the server and will connect to the db and syncronise the models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully.');
    // we would use force: true, to drop the tables and create them again
    // useful in case you need to add a new column to a table for instance
    await sequelize.sync({ force: false });
    console.log('All models synchronised successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
