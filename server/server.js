import express from 'express';
// we would use cors if we were using a frontend, not needed for this project
// import cors from 'cors';

// we import the sequelize instance to be able to connect and syncronise the db
import sequelize from './models/index.js';

// we import the router from the router.js file where our endpoints are defined
import router from './router.js';

const PORT = 4000;

const app = express();

// here we would initialise cors
// app.use(cors());

// we would use .json() as a body parser to parse json data
app.use(express.json());
app.use(router);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully.');
    await sequelize.sync({ force: false });
    console.log('All models synchronised successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
