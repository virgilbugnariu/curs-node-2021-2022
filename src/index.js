const express = require('express');
const bodyParser = require('body-parser');

const handleGreeting = require('./controllers/greeting');
const { port } = require('./config/express');
const authorizationMiddleware = require('./middlewares/authorization');
const loginHandler = require('./controllers/login');

const app = express();
app.use(bodyParser.json());

app.post("/login", loginHandler);

app.get("/hello", authorizationMiddleware, handleGreeting);

app.get("/hello/:name?", authorizationMiddleware, handleGreeting);

app.listen(port, () => {
  console.log("Server started on", port);
});