import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import { jwtStrategy } from "./config/passport.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import recipeRouter from "./routes/recipeRouter.js";
import { apiContent } from "./middlewares/apiContentType.js";
import { allowCrossDomain } from "./middlewares/allowCrossDomain.js";
import db from "./config/mongoose.js";
dotenv.config({ path: ".env" });
const app = express();

//Allow CORS
app.use(cors());
app.options("*", cors());
// Use middleware
app.use(apiContent);

// Use common 3rd-party middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Passport
passport.use(jwtStrategy);

// Auth Router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/recipes", recipeRouter);

app.get("/api/v1", (req, res) => {
  res.send("Hello World");
});
// Listening to the server
app.listen(process.env.PORT || 5000, (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
  }
});
