const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

const createUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }
});

module.exports = createUserInputType;