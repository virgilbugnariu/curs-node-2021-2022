const { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Comment',
  fields: () => { 
    const postType = require('./postType');
    const userType = require('./userType');

    return {
      id: {
        type: GraphQLID,
      },
      body: {
        type: GraphQLString,
      },
      post: {
        type: postType,
        resolve: async (source) => {
          return await source.getPost();
        }
      },
      author: {
        type: userType,
        resolve: async (source) => {
          return await source.getUser();
        }
      }
    }
  }
});