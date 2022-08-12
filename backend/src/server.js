require("dotenv/config");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

require("./database");

app.use(cors());
app.use(
  "/avatars",
  express.static(path.resolve(__dirname, "..", "uploads", "avatars"))
);
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "posts"))
);
app.use(express.json());
app.use(require("./routes"));

app.listen(process.env.PORT, () => {
  console.log(`App running on port: ${process.env.PORT}`);
});
