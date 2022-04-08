const jwt = require('jsonwebtoken');

const BAD_REQUEST = 400;

const jwtVerification = (req, res, next) => {
  try {
    const { id } = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    req.id = id;
    next();
  } catch (error) {
    res.status(BAD_REQUEST).send({ message: 'You are not authorized' });
  }
};

module.exports = jwtVerification;
