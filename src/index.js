const express = require('express');
const { handleGreeting, otherValue } = require('./greeting');
const handleCatFactsRequest = require('./catFacts');

const app = express();
const port = 3001;

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.get("/hello/:name?", (request, response) => {
  handleGreeting(request, response);
  console.log(otherValue);
});

app.get('/cat/facts', handleCatFactsRequest);

app.listen(port, () => {
  console.log("Server started on", port);
});