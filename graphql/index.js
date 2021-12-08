const { 
  GraphQLSchema, 
} = require('graphql');

const queryType = require('./queryType');
const mutationType = require('./mutationType');
const subscriptionType = require('./subscriptionType');

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
  subscription: subscriptionType,
});

module.exports = schema;