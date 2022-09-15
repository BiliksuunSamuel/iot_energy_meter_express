import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || process.env.port,
  connectionString: "mongodb://localhost:27017/smartmeter",
};
