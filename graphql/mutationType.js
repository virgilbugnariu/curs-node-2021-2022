const { 
  GraphQLObjectType, GraphQLString, GraphQLNonNull
} = require('graphql');
const loginHandler = require('../repository/login');
const createUserInputType = require('./inputTypes/createUserInputType');
const loginInputType = require('./inputTypes/loginInputType');
const updateUserInputType = require('./inputTypes/updateUserInputType');

const loginResultType = require('./types/loginResultType');
const userType = require('./types/userType');
const db = require('../models');
const { createUser, updateUser } = require('../repository/users');
const pubsub = require('../pubsub');
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: loginResultType,
      args: {
        loginInput: {
          type: loginInputType,
        }
      },
      resolve: (source, args) => {
        const { email, password } = args.loginInput;
        
        const token = loginHandler(email, password);

        return {
          token,
        }
      }
    },
    createUser: {
      type: userType,
      args: {
        createUserInput: {
          type: createUserInputType,
        }
      },
      resolve: async (source, args) => {
        const createdUser = await createUser(args.createUserInput);
        console.log('createdUser', createdUser)
        pubsub.publish('something_changed', { countdown: { ...createdUser.toJSON() }});
        return createdUser.toJSON();
      }
    },
    updateUser: {
      type: userType,
      args: {
        updateUserInput: {
          type: updateUserInputType,
        },
      },
      resolve: async (source, args, context) => {
        return updateUser(args.updateUserInput, context);
      }
    }
  },
})

module.exports = mutationType;