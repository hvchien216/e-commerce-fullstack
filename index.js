const express = require("express");
const morgan = require("morgan");
const initData = require("./utils/createData");
require('dotenv').config();

const app = express();
app.use(morgan("dev"));

require("./startUp/connectDb")();
require("./startUp/parser")(app);
require("./startUp/routes")(app);

const main = async () => {
  console.log(`Server started at http://localhost:${PORT}`);
  // try {
  //   await initData.createInitialEnums();
  //   console.log('Initial data is successfully prepared!!!');
  // } catch (error) {
  //   console.error(error);
  // }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.error("Error to connect server ", err);
    process.exit(1);
  }
  main();
});