const { Users } = require('../models');

const OK = 200;
const BAD_REQUEST = 400;

module.exports = {
  registrationUser(req, res) {
    console.log(req);
    Users.create({ username: req.body.username })
      .then((news) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(OK).send(news);
      })
      .catch((error) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(BAD_REQUEST).send(error);
      });
  },
};
