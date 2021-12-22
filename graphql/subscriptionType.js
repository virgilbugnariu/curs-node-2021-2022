const { GraphQLObjectType } = require("graphql");
const commentType = require("./types/commentType");

const pubsub = require('../pubsub');

const db = require('../models');

const subscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    postComments: {
      type: commentType,
      subscribe: () => {
        return pubsub.asyncIterator('comments');
      },
      resolve: async (source) => {
        console.log('source.postComments', source.postComments.comment)
        const comment = await db.Comment.findByPk(source.postComments.comment.id);

        return comment;
      },
    }
  }
});

module.exports = subscriptionType;