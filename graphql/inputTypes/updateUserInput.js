const {
  GraphQLInputObjectType, 
  GraphQLString, 
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const updateUserInput = new GraphQLInputObjectType({
  name: 'UpdateUserInput',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID)},
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
  }
});

module.exports = updateUserInput;