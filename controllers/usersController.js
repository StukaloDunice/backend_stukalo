const { News, Users } = require('../models');

const OK = 200;
const BAD_REQUEST = 400;

module.exports = {
  currentUser(req, res) {
    Users.findOne({ where: { id: req.params.id }, include: { model: News, as: 'news' } })
      .then((user) => {
        console.log(user);
        res.status(OK).send(user);
      })
      .catch((error) => {
        res.status(BAD_REQUEST).send(error);
      });
  },
};
