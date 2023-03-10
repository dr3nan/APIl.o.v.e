import { User } from '../models/models.js';

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
