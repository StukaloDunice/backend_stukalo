const { News, Users } = require('../models');

const OK = 200;
const BAD_REQUEST = 400;

module.exports = {
  getNews(req, res) {
    News.findAll({ include: { model: Users, as: 'user' } })
      .then((news) => {
        res.status(OK).send(news);
      })
      .catch((error) => {
        res.status(BAD_REQUEST).send(error);
      });
  },
};
