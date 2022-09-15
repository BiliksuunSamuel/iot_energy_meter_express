import mongoose from "mongoose";
import configuration from "../configuration";

export default mongoose.connect(configuration.connectionString, (error) => {
  if (error) {
    throw error;
  }
  console.log("Database Connected Successfully");
});
