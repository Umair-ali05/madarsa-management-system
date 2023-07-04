import mongoose from "mongoose";

import { config } from "dotenv";

config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
  mongoose.connection.on("err", console.error.bind("this is error"));
};

export default connect;
