import mongoose from "mongoose";

const mongoURI = "mongodb://localhost:27017";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
  console.log("Connected to mongo successfully");
};

export default connectToMongo;
