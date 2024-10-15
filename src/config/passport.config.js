import passport from "passport";
import jwt from "passport-jwt";
//import UserModel from "../models/user.model.js";
//import { Strategy as LocalStrategy } from "passport-local";

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
  //PENDIENTE METER ESTRATEGIA REGISTER Y LOGIN

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse",
      },
      async (jwt_payload, done) => {
        try {
          //CHECAR SI DEJO LO SIGUIENTE:Agregué buscar el usuario en la base de datos usando el ID del payload JWT
          //const user = await UserModel.findById(jwt_payload.user._id); //Checar si va aquí (jwt_payload.user._id) o (jwt_payload.id)
          // if (!user) {
          //  return done(null, false);
          //}
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["coderCookieToken"];
  }
  return token;
};

export default initializePassport;
