const mongoose = require("mongoose");
module.exports = () => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log("Error to connect database :: ", err));
};