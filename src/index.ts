import * as fs from 'fs';

if (process.argv.length == 2) {
  console.error('Must supply at least one argument. Should be a recipe URL');
  process.exit(-1);
}

const urls = process.argv.slice(2);

import {
  authenticate,
  destroy
} from './authenticate';

import beginScraping from './scraper';

let authToken: string = '';

function ready() {
  beginScraping(authToken, urls);
}

if (!fs.existsSync('token')) {
  ready();
  /*authenticate()
    .then(token => {
      authToken = token;
      fs.writeFile('token', token);
      destroy();
    })
    .catch(err => {
      console.log('There was a problem with the token authentication');
      console.log(err);
    });*/
} else {
  authToken = fs.readFileSync('token').toString();
  ready();
}