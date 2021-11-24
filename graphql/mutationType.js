const { 
  GraphQLObjectType, GraphQLNonNull, GraphQLID, 
} = require('graphql');

const userType = require('./types/userType');
const createUserInput = require('./inputTypes/createUserInput');
const updateUserInput = require('./inputTypes/updateUserInput');

const db = require('../models');

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: userType,
      args: {
        createUserInput: {
          type: new GraphQLNonNull(createUserInput)
        }
      },
      resolve: async (source, args, context) => {
        console.log('args', args.createUserInput)

        try {
          const user = await db.User.create({...args.createUserInput});
          return user.toJSON();
        } catch (e) {
          console.error(e);
          return null;
        }
      }
    },
    updateUser: {
      type: userType,
      args: {
        updateUserInput: { type: new GraphQLNonNull(updateUserInput)}
      },
      resolve: async(source, args, context) => {
        const { id, ...fields } = args.updateUserInput;
        console.log('fields', fields)
        console.log('args', args)
        try {
          await db.User.update({
            ...fields
          }, { where: { id: id }});
          
          const user = await db.User.findByPk(id);
          return user;

        } catch (e) {
          console.error(e);
        }
      }
    }
  },
})

module.exports = mutationType;