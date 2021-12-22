const ws = require('ws');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const express = require('express');
const { useServer } = require('graphql-ws/lib/use/ws');

const { port } = require('./config/express');
const authorizationMiddleware = require('./middlewares/authorization');
require('./pubsub');
const schema = require('./graphql');

const app = express();

app.use('/graphql', authorizationMiddleware, graphqlHTTP({
  schema,
}));

const server = createServer(app);

const wsServer = new ws.Server({
  server,
  path: '/subscriptions',
});


server.listen(port, () => {
  useServer({
    schema,
    execute,
    subscribe,
  }, wsServer);
  console.log("Server started on", port);
});