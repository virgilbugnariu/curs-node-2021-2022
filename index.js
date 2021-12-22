const express = require('express');
const { createServer } = require('http');
const ws = require('ws');

const { useServer } = require('graphql-ws/lib/use/ws');

const { graphqlHTTP } = require('express-graphql');

const { port } = require('./config/express');

const authorizationMiddleware = require('./middlewares/authorization');

const schema = require('./graphql');

const { execute, subscribe } = require('graphql');

const app = express();

require('./pubsub');

app.use('/graphql', authorizationMiddleware, graphqlHTTP({
  schema,
}));

const server = createServer(app);

const wsServer = new ws.Server({
  server,
  path: '/subscriptions'
});

server.listen(port, () => {
  useServer({
    schema,
    execute,
    subscribe,
  }, wsServer);
  console.log("Server started on", port);
});