const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST, {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDb;
