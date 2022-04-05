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
      defaults: {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
      },
    })
      .then(([user, created]) => {
        if (!created) {
          res.status(BAD_REQUEST).send({ message: 'User exists' });
        } else {
          const token = generateJWT(user.dataValues);
          res.status(OK).send(token);
        }
      })
      .catch((error) => {
        res.status(BAD_REQUEST).send(error.message);
      });
  },
  authenticationUser(req, res) {
    Users.findOne({
      where: { email: req.body.email },
    })
      .then((user) => {
        if (user) {
          const validPassword = bcrypt.compareSync(
            req.body.password,
            user.password,
          );
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
  whoIAm(req, res) {
    Users.findOne({
      where: { id: req.id },
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
  },
  googleAuthorization(accessToken, refreshToken, profile, done) {
    Users.findOne({
      where: { email: profile.emails[0].value },
    }).then((user) => {
      if (!user) {
        Users.create({
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          username: profile.displayName,
        })
          .then((userDb) => {
            const token = generateJWT(userDb);
            done(null, token);
          })
          .catch((err) => done(err, null));
      } else {
        const token = generateJWT(user);
        done(null, token);
      }
    });
  },
};
