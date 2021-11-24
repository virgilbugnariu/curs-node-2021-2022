const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { port } = require('./config/express');

const authorizationMiddleware = require('./middlewares/authorization');

const schema = require('./graphql');

const app = express();

app.use('/graphql', authorizationMiddleware, graphqlHTTP({
  schema,
}));

app.listen(port, () => {
  console.log("Server started on", port);
});