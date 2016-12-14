const scrapeHelper = require('../utils/scrapeHelper');

const Recipe = require('../Recipe');

module.exports = {
  hostname: 'allrecipes.com',

  scrape(url) {
    return scrapeHelper(url)
      .then($ => {
        let name = $('.recipe-summary').find('h1').text();
        let ingredients = $('.checklist')
          .find('li label')
          .map((i, ingredient) => {
            return $(ingredient).text().trim()
          })
          .toArray()
          .filter(ingredient => {
            return ingredient && !ingredient.startsWith('Add all')
          });

        let instructions = $('.directions--section .list-numbers')
          .find('li')
          .map((i, instruction) => {
            return $(instruction).text().trim()
          })
          .toArray()
          .filter(instruction => {
            return instruction;
          });

        return new Recipe({
          name,
          ingredients,
          instructions
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
};