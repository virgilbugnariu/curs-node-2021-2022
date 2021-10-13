const express = require('express');
const app = express();
const port = 3001;

app.get("/", (request, response) => {
  response.send("Hello World!");
});

// app.get("/hello", (request, response) => {
//   response.send("Hello World!");
// });

app.get("/hello/:name?", (request, response) => {
  if(!request.params.name) {
    response.send("Hello world!")
  } else {
    const message = "Hello " + request.params.name;
    response.send(message);
  }
});

app.listen(port, () => {
  console.log("Server started on", port);
});