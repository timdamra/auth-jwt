const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const secret = 'samplesecret';

const jwtOptions = {
  // jwtFromRequest: where to grab jwt from
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  // access to secret
  secretOrKey: secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // payload is decoded JWT - gives access to user id
  // done success callback

  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// tell passport to use strategy
passport.use(jwtLogin);
