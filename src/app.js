const express = require("express");
const cors = require("cors");

const githubRoutes = require("./routes/github.routes");
const errorHandler = require("./middleware/errorHandler");
const docsRoutes = require("./routes/docs.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/github", githubRoutes);
app.use("/docs", docsRoutes);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GitHub Profile Analyzer API Running",
  });
});

module.exports = app;
