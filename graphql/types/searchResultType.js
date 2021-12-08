const { GraphQLUnionType } = require("graphql");
const userType = require('./userType');
const postType = require('./postType');
const db = require('../../models');

const searchResultType = new GraphQLUnionType({
  name: 'SearchResult',
  types: [userType, postType],
  resolveType: (value) => {
    if(value instanceof db.User) {
      return userType.name;
    }

    if(value instanceof db.Post) {
      return postType.name;
    }
  }
});

module.exports = searchResultType;