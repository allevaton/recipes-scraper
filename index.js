const fs = require('fs');

if (process.argv.length === 2) {
  console.error('Must supply at least one argument. Should be a recipe URL');
  process.exit(-1);
}

const urls = process.argv.slice(2);

const {
  authenticate,
  destroy
} = require('./src/authenticate');

const beginScraping = require('./src/scraper');

let authToken = '';

function ready() {
  beginScraping(authToken, urls);
}

if (!fs.existsSync('token')) {
  authenticate()
    .then(token => {
      authToken = token;
      fs.writeFile('token', token);
      destroy();
      ready();
    })
    .catch(() => {
      console.log('There was a problem with the token authentication');
    });
} else {
  authToken = fs.readFileSync('token');
  ready();
}