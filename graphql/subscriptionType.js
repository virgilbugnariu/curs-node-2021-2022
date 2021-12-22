const { GraphQLObjectType, GraphQLInt } = require("graphql");
const fetch = require('node-fetch');
const pubsub = require("../pubsub");
const userType = require("./types/userType");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const subscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    countdown: {
      type: userType,
      subscribe: () => {
        return pubsub.asyncIterator('something_changed');
      },
      resolve: (source) => {
        return source.countdown;
      }
    }
  }
});

module.exports = subscriptionType;