import { getUserByEmail } from "../services/userServices.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import env from "./environment.js";
export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: env.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    const userEmail = payload.email;
    try {
      const foundUser = await getUserByEmail(userEmail);
      done(null, foundUser);
    } catch (error) {
      done(error);
    }
  }
);
