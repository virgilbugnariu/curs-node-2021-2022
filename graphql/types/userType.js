const { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLID,
} = require('graphql');

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLID,
    },
    email: { 
      type: GraphQLString,
    },
    firstName: { 
      type: GraphQLString 
    },
    lastName: { 
      type: GraphQLString 
    },
  }
});

module.exports = userType;