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
          throw new Error('User exists');
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
            throw new Error('User is not found');
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
};
