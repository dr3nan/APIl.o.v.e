import { User, House } from '../models/models.js';

export const getUsers = async (req, res) => {
  try {
    const get = await User.findAll({});
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
    const getUser = await User.findOne({ where: { id: id } });
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
      where: { id: id },
      include: 'houses'
    });
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

export const createUserHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, country, city } = req.body;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      res.sendStatus(404);
      res.send('User not found');
      return;
    }
    console.log('user id ============>: ', user.id);

    const house = await House.create({ address, country, city, userId: user.id });
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
    await User.destroy({ where: { id: id } });
    res.status(200);
    res.send('Deleted');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
