const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("GET / This is the root URL");
});

function errorCatch(req, res, next) {
  const error = new Error("Sorry, the requested resource couldn't be found");
  error.statusCode = 404;
  next(error);
}

function err(err, req, res, next) {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const response = {
    message: err.message,
    status: statusCode,
  };
  res.status(statusCode).json(response);
}
app.use(errorCatch);
app.use(err);

const port = 5000;
app.listen(port, () => console.log("Server is listening on port", port));
