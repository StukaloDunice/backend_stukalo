const jwt = require('jsonwebtoken');
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
        res.status(OK).send(news);
      })
      .catch((error) => {
        res.status(BAD_REQUEST).send(error);
      });
  },
  addNews(req, res) {
    try {
      const id = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
      console.log(req.body);
      News.create({ ...req.body, userId: id.id, image: req.file.path })
        .then((news) => res.status(OK).send(news))
        .catch((error) => res.status(BAD_REQUEST).send(error));
    } catch (error) {
      res.status(BAD_REQUEST).send({ message: 'Log in again' });
    }
  },
};
