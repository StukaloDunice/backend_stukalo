const { News, Users } = require('../models');

const OK = 200;
const BAD_REQUEST = 400;

module.exports = {
  getNews(req, res) {
    News.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Users,
          as: 'user',
          attributes: ['username', 'id', 'email', 'avatar'],
        },
      ],
    })
      .then((news) => {
        console.log(news);
        res.status(OK).send(news);
      })
      .catch((error) => {
        res.status(BAD_REQUEST).send(error);
      });
  },
};
