const jwt = require('jwt-simple');
const User = require('../models/user');
const secret = 'samplesecret';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user._id, iat: timestamp}, secret);
}

exports.signup = function(req, res, next) {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(422).send({
      error: 'must provide email or password',
    });
  }

  User.findOne({email})
    .then(existingUser => {
      if (existingUser) {
        return res.status(422).send({error: 'email in use'});
      }

      const user = new User({
        email,
        password,
      });

      user.save(function(err) {
        if (err) {
          return next(err);
        }

        res.json({success: 'true'});
      });
    })
    .catch(err => next(err));
};
