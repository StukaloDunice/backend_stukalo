const token = require("jsonwebtoken");
const { Users } = require("../models");

const OK = 200;
const BAD_REQUEST = 400;

module.exports = {
  registrationUser(req, res) {
    Users.create(req.body)
      .then((user) => {
        res.status(OK).send(user);
      })
      .catch((error) => {
        res.status(BAD_REQUEST).send(error);
      });
  },
};
