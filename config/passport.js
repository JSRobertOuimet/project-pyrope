const
  JWTStrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt,

  User = require("../models/User"),

  jwtKey = require("../config/credentials").jwtKey,
  options = {};

options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = jwtKey;

module.exports = passport =>
  passport
    .use(new JWTStrategy(options, (jwtPayload, done) => {
      User
        .findById(jwtPayload.id)
        .then(user => {
          if(!user) {
            return done(null, false);
          }
          else {
            return done(null, user);
          }
        })
        .catch(err => console.log(err));
    }));