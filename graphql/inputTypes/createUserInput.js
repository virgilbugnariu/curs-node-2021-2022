const {
  GraphQLInputObjectType, 
  GraphQLString, 
  GraphQLNonNull
} = require('graphql');

const createUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
  }
});

module.exports = createUserInput;