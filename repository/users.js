const db = require('../models');

module.exports.getAllUsers = async () => {
  try {
    const allUsers = await db.User.findAll();
    return allUsers;
  } catch (error) {
    console.error('Something went wrong');
    return null;
  } 
}

module.exports.getUserById = async (id) => {
  return await db.User.findByPk(id);
}

module.exports.createUser = async (args) => {
  const { email, password, firstName, lastName } = args;
  try {
    const newUser = await db.User.create({
      email,
      password,
      firstName,
      lastName,
    });

    return newUser;

  } catch (error) {
    console.error(error);
    return null;
  }
}

// Updated User
module.exports.updateUser = async (args, context) => {
  const { user } = context;
  const hasPermission = await user.can('UPDATE_USER');
  console.log(hasPermission);
  
  if(!user) {
    return null;
  }

  const { id } = user;
  
  const { email, firstName, lastName } = args;

  try {
    await db.User.update({
      email,
      firstName,
      lastName,
    }, { where: { id } });

    return await db.User.findByPk(id);

  } catch (e) {
    console.error(e);
    return null;
  }
}

// Nothing
module.exports.deleteUser = (req, res) => {
  
}
