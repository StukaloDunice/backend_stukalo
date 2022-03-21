const { Users } = require('../models');

const OK = 200;
const BAD_REQUEST = 400;

module.exports = {
  registrationUser(req, res) {
    Users.create(req.body)
      .then((news) => {
        res.status(OK).send(news);
      })
      .catch((error) => {
        res.status(BAD_REQUEST).send(error);
      });
  },
};
