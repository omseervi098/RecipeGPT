import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const development = {
  name: "Development",
  port: process.env.PORT || 5000,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
};
const production = {
  name: "Production",
  port: process.env.PORT || 5000,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
};
export default process.env.NODE_ENV === "development"
  ? development
  : production;
