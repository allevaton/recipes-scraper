import * as dotenv from 'dotenv';
dotenv.config();

import * as passport from 'passport';
const TrelloStrategy = require('passport-trello').Strategy;

import opener = require('opener');
import * as request from 'request';

import * as express from 'express';
const app = express();
import * as session from 'express-session';

app.use(session({
  secret: 'oaihfoahwf8(AH(*FH(82hf28hf9q82hf9aouhf2a2hfla98fhla982fh9la2f)'
}));
app.use(passport.initialize());
app.use(passport.session());

/*function ensureAuthenticated(req: Express.Request, res: Express.Response, next: Express.Request) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next();
  }

  // denied. redirect to login
  res.redirect('/auth/trello')
}*/

function startServer(): Promise<string> {
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
      (req: string, token: string, tokenSecret: string, profile: string, done: Function) => {
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

    // app.use('/', ensureAuthenticated, (req, res) => {
    // res.send('<html><body><h1>AUTHENTICATED</h1></body></html>');
    // });

    app.listen(3030, (err: string) => {
      if (err)
        return reject(err);

      opener('http://localhost:3030/auth/trello');
    });
  });
}

export function authenticate(): Promise<string> {
  return startServer();
};

export function destroy() {

}
