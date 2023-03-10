import express from 'express';

const router = express.Router();

// we define the endpoints for the GET requests
// if we have a db set, we would use it to get the data through the models we defined
// if we don't have a db set, we would use the data from the data.js file
// here we get all users
router.get('/users', getUsers);
// here we get a single user
// the id is dynamic, so we use a placeholder with a colon
router.get('/users/:id', getUser);
// here we get all houses from a single user
router.get('/users/:id/houses', getUserHouses);

// we define the endpoints for the POST requests
// here we create a new user
router.post('/users', createUser);

// here we create a new house for a user
router.post('/users/:id/houses', createUserHouse);

// we define the endpoints for the PUT requests
// here we update a user
router.put('/users/:id', updateUser);

// we define the endpoints for the PATCH requests
// here we update a user parameter, we use this method to instead of updating the whole user, we update only one parameter
router.patch('/users/:id', updateUserParameter);
// here we update a specific house for a user
router.patch('/users/:id/houses/:houseId', updateUserHouse);

// we define the endpoints for the DELETE requests
// here we delete a user
router.delete('/users/:id', deleteUser);
// here we delete a house for a user
router.delete('/users/:id/houses/:houseId', deleteUserHouse);

export default router;
