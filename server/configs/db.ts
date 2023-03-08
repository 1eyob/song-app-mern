import mongoose, { ConnectOptions } from "mongoose";
require("dotenv").config();

const connectionString = process.env.MONGO_URI as string;
export const connect = async () => {
  try {
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log(`MongoDB Connected: ${conn.connection.port}`);
  } catch (e) {
    console.log(e);
  }
};

export const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
};
