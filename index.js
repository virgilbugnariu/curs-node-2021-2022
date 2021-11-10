const express = require('express');
const bodyParser = require('body-parser');

const handleGreeting = require('./controllers/greeting');
const { port } = require('./config/express');
const authorizationMiddleware = require('./middlewares/authorization');
const loginHandler = require('./controllers/login');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('./controllers/users');
const { getAllPosts, getPostById, createPost, updatePost, deletePost, addTagToPost } = require('./controllers/posts');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql');

const app = express();
app.use(bodyParser.json());

app.post("/login", loginHandler);

app.get("/hello", authorizationMiddleware, handleGreeting);

app.get("/hello/:name?", authorizationMiddleware, handleGreeting);

app.get("/users", getAllUsers);
app.get("/users/:id", getUserById);
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/user/:id", deleteUser);

app.post("/users/:id/posts", createPost);

app.get("/posts", getAllPosts);
app.get("/posts/:id", getPostById);

app.post("/posts/:postId/tags/:tagId", addTagToPost);

app.put("/posts/:id", updatePost);
app.delete("/posts/:id", deletePost);

app.use('/graphql', graphqlHTTP({
  schema,
}));

app.listen(port, () => {
  console.log("Server started on", port);
});