const db = require('../models');
const { Op } = require('sequelize');

module.exports.search = async (query) => {
  try {
    // Users
    const users = db.User.findAll({ where: { firstName: { [Op.like]: `%${query}%`} }});
    // Posts
    const posts = db.Post.findAll({ where: { title: { [Op.like]: `%${query}%`} }});

    const results = await Promise.all([users, posts]);
    
    return [
      ...results[0],
      ...results[1]
    ];

  } catch (error) {
    console.error('Something went wrong');
    return [];
  }
}