const request = require('request');
const cheerio = require('cheerio');

module.exports =

  /**
   * @param {string} url
   * @returns {Promise<CheerioStatic>} Returns a cheerio instance ready for scraping usage
   */
  function (url) {
    return new Promise((resolve, reject) => {
      request(url, (err, response, body) => {
        if (err)
          return reject(err);

        if (response.statusCode !== 200)
          return reject(response.statusCode);

        resolve(cheerio.load(body))
      })
    })
  }