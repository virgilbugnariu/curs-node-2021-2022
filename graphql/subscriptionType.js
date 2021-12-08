const { GraphQLObjectType, GraphQLInt } = require("graphql");
const fetch = require('node-fetch');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const subscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    countdown: {
      type: GraphQLInt,
      subscribe: async function* fiveToOne() {
        for (const number of [5, 4, 3, 2, 1]) {
          await sleep(1000);
          const response = await fetch('http://worldtimeapi.org/api/timezone/Europe/Bucharest');
          const data = await response.json();
          yield { countdown: data.unixtime };
        }
      },
    }
  }
});

module.exports = subscriptionType;