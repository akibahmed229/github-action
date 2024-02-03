const express = require("express");
const app = express();
const port = 5000;

// serving static files
app.use(express.static("public"));

// route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hello World!!!",
  });
});
app.get("/user", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hello USER!!!",
  });
});

// client error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// server error
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// server listening on
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
