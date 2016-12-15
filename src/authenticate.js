require('dotenv').config();
const passport = require('passport');
const TrelloStrategy = require('passport-trello').Strategy;

const opener = require('opener');

const request = require('request');

const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
  secret: 'oaihfoahwf8(AH(*FH(82hf28hf9q82hf9aouhf2a2hfla98fhla982fh9la2f)'
}));
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next();
  }

  // denied. redirect to login
  res.redirect('/auth/trello')
}

/**
 * @returns {Promise<string>}
 */
function startServer() {
  return new Promise((resolve, reject) => {
    passport.use('trello', new TrelloStrategy({
        consumerKey: process.env.TRELLO_ID,
        consumerSecret: process.env.TRELLO_SECRET,
        callbackURL: 'http://localhost:3030/auth/trello/callback',
        passReqToCallback: true,
        trelloParams: {
          scope: 'read,write',
          name: 'AllRecipesScraper',
          expiration: 'never'
        }
      },
      (req, token, tokenSecret, profile, done) => {
        if (token) {
          resolve(token);
          return done(null, profile);
        } else {
          reject('err');
        }
      }));

    app.use('/auth/trello', passport.authenticate('trello'));

    app.use('/auth/provider/trello',
      passport.authenticate('trello', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );

    app.use('/', ensureAuthenticated, (req, res) => {
      res.send('<html><body><h1>AUTHENTICATED</h1></body></html>');
    });

    app.listen(3030, (err) => {
      if (err)
        return reject(err);

      opener('http://localhost:3030/auth/trello');
    });
  });
}

module.exports.authenticate = () => {
  return startServer()
    .catch(err => {
      console.error(err);
    });
}

module.exports.destroy = () => {}