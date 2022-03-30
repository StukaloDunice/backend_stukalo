const { News, Users } = require('../models');

const OK = 200;
const BAD_REQUEST = 400;

module.exports = {
  currentUser(req, res) {
    Users.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
      include: [
        {
          model: News,
          as: 'news',
          attributes: ['id', 'title', 'content', 'tags', 'image'],
        },
      ],
    })
      .then((user) => {
        res.status(OK).send(user);
      })
      .catch((error) => {
        res.status(BAD_REQUEST).send(error);
      });
  },
  editingUser(req, res) {
    Users.update({
      username: req.body.username,
      avatar: req.file.path,
    }, { where: { id: req.body.id } })
      .then(() => Users.findOne({
        where: { id: req.body.id },
        attributes: {
          exclude: ['createAt', 'updateAt', 'password'],
        },
      }))
      .then((user) => res.status(OK).send(user))
      .catch((error) => res.status(BAD_REQUEST).send(error));
  },
};
