import { User, House } from '../models/models.js';

export const getUsers = async (_, res) => {
  try {
    const get = await User.findAll({});

    if (get.length === 0) {
      res.send('No users found');
    };

    res.status(200);
    res.send(get);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await User.findOne({
      where: { id }
    });

    if (!getUser) {
      // I decided to comment the 404 status code because it was causing my server to stop
      // I could have installed nodemon to mitigate this behaviour, but I chose not to
      // res.status(404);
      res.send('No user found');
    };

    res.status(200);
    res.send(getUser);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const getUserHouses = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await User.findOne({
      where: { id },
      include: [{ model: House, as: 'Houses' }]
    });

    if (getUser.Houses.length === 0) {
      res.send('No houses found');
    };

    res.status(200);
    res.send(getUser.Houses);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
// TODO: add multiparam handling
export const getUserHousesFiltered = async (req, res) => {
  try {
    const { id } = req.params;
    const { city, address, country} = req.query;
    const filtered = {};

    if (city) {
      filtered.city = city;
    };

    if (address) {
      filtered.address = address;
    };

    if (country) {
      filtered.country = country;
    };

    const getUser = await User.findOne({
      where: { id },
      include: [
        {
          model: House,
          as: 'Houses',
          where: filtered
        },
      ],
    });

    if (!getUser) {
      res.send('No user found');
    };

    if (getUser.Houses.length === 0) {
      res.send('No houses found');
    };

    res.status(200);
    res.send(getUser.Houses);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, surname } = req.body;
    const post = await User.create({ name, surname });
    res.status(201);
    res.send(post);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname } = req.body;
    const user = await User.findOne({
      where: { id }
    });

    if (!user) {
      res.send('User not found');
    };

    await user.update({ name, surname });
    res.status(200);
    res.send(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const updateUserParameter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname } = req.body;
    const user = await User.findOne({
      where: { id }
    });

    if (!user) {
      res.send(`User ${user.name} not found`);
    };

    if (name) {
      user.name = name;
    };

    if (surname) {
      user.surname = surname;
    };

    await user.save();
    res.status(200);
    res.send(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const updateUserHouseParameter = async (req, res) => {
  try {
    const { houseId } = req.params;
    const { address, country, city } = req.body;

    const house = await House.findOne({
      where: { houseId }
    });

    if (!house) {
      res.send('House not found');
    };

    if (address) {
      house.address = address;
    };

    if (country) {
      house.country = country;
    };

    if (city) {
      house.city = city;
    };

    await house.save();
    res.status(200);
    res.send(house);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const createUserHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, country, city } = req.body;
    const user = await User.findOne({
      where: { id }
    });

    if (!user) {
      res.send('User not found');
    };

    const house = await House.create({
      address,
      country,
      city,
      userId: user.id
    });

    await user.addHouse(house);
    res.status(201);
    res.send(house);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      include: [{ model: House, as: 'Houses' }]
    });

    if (!user) {
      res.send('User not found');
    };

    if (user.Houses.length > 0) {
      res.status(400);
      res.send('User has houses, delete them first');
    };
    
    await User.destroy({
      where: { id }
    });

    res.status(200);
    res.send('User Deleted');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const deleteUserHouse = async (req, res) => {
  try {
    const { id, houseId } = req.params;
    const user = await User.findOne({
      where: { id }
    });

    const house = await House.findOne({
      where: { houseId }
    });

    if (!house) {
      res.send(`House in user ${user.name} not found`);
    };

    await user.removeHouse(house);
    await house.destroy();

    res.status(200);
    res.send(`House ${houseId}, deleted!`);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
