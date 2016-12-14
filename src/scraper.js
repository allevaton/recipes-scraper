const url = require('url');

const providers = require('./providers/index');

/**
 * Goes through all the URLs and begins scraping each based on their domain
 * 
 * @param {string} token
 * @param {Array<string>} urls
 */
module.exports = function beginScraping(token, urls) {
  urls.forEach(recipeUrl => {
    const urlParts = url.parse(recipeUrl);
    
    Object.values(providers).some(provider => {
      if (provider.hostname === urlParts.hostname) {
        provider.scrape(recipeUrl);
        return true;
      }
    })
  })
};