const { 
  GraphQLObjectType, 
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const db = require('../models');

const userType = require('./types/userType');
const postType = require('./types/postType');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: async () => {
        return await db.User.findAll();
      }
    },
    user: {
      type: userType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        }
      },
      resolve: async (source, { id }) => {
        return await db.User.findByPk(id);
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async () => {
        return await db.Post.findAll();
      }
    },
    post: {
      type: postType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        }
      },
      resolve: async (source, { id }) => {
        const post = await db.Post.findByPk(id);
        return post;
      }
    },

  }
});

module.exports = queryType;