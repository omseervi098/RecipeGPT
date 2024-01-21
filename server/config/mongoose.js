import mongoose from "mongoose";
import env from "./environment.js";
mongoose.connect(env.mongoUrl, {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Issue with MongoDB"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});
export default db;
