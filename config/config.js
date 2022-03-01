require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME_FOR_DB,
    password: process.env.PASSWORD_FOR_DB,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
