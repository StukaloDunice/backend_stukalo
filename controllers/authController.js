const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { Users } = require('../models');

const OK = 200;
const BAD_REQUEST = 400;

const salt = bcrypt.genSaltSync(10);
const generateJWT = (user) => jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });

module.exports = {
  registrationUser(req, res) {
    Users.findOrCreate({
      where: { email: req.body.email },
      defaults: { username: req.body.username, password: bcrypt.hashSync(req.body.password, salt) },
    })
      .then(([user, created]) => {
        if (!created) {
          res.status(BAD_REQUEST).send({ message: 'User exists' });
        } else {
          const token = generateJWT(user.dataValues);
          res.status(OK).send(token);
        }
      }).catch((error) => {
        res.status(BAD_REQUEST).send(error.message);
      });
  },
  authenticationUser(req, res) {
    Users.findOne({
      where: { email: req.body.email },
    })
      .then((user) => {
        if (user) {
          const validPassword = bcrypt.compareSync(req.body.password, user.password);
          if (!validPassword) {
            res.status(BAD_REQUEST).send({ message: 'Invalid password' });
          } else {
            const token = generateJWT(user);
            res.status(OK).send(token);
          }
        }
      })
      .catch((error) => {
        res.status(BAD_REQUEST).send(error.message);
      });
  },
  currentUser(req, res) {
    try {
      const id = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
      Users.findOne({
        where: { id: id.id },
      })
        .then((user) => {
          res.status(OK).send({
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            email: user.email,
          });
        })
        .catch((error) => {
          res.status(BAD_REQUEST).send(error.message);
        });
    } catch (error) {
      res.status(BAD_REQUEST).send({ message: 'Log in again' });
    }
  },
};
