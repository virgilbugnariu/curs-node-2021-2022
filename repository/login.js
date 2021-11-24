const jwt = require('jsonwebtoken');
const findUser = require('../helpers/findUser');
const { MY_SECRET_KEY } = require('../config/jwt');
const db = require('../models');

const loginHandler = async (email, password) => {
  const user = await db.User.findOne({
    where: {
      email,
      password,
    }
  });

  if(user) {
    return jwt.sign({
      id: user.id,
    }, MY_SECRET_KEY);
  } else {
    return null;
  }
}

module.exports = loginHandler;