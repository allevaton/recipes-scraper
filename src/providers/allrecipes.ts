import scrapeHelper from '../utils/scrapeHelper';

const allrecipes: Provider = {
  hostname: 'allrecipes.com',

  scrape(url: string) {
    return scrapeHelper(url)
      .then($ => {
        let name = $('.recipe-summary').find('h1').text();
        console.log(name);

        let ingredients = $('.checklist')
          .find('li label')
          .map((i, ingredient) => {
            return $(ingredient).text().trim()
          })
          .toArray()
          .filter(ingredient => {
            return String(ingredient).lastIndexOf('Add all', 0) != 0
          })
          .map(String);

        let instructions = $('.directions--section .list-numbers')
          .find('li')
          .map((i, instruction) => {
            return $(instruction).text().trim()
          })
          .toArray()
          .filter(instruction => {
            return instruction;
          })
          .map(String);

        let recipe: Recipe = {
          name,
          ingredients,
          instructions
        };

        console.log(recipe);
        return recipe;
      })
  }
}

export default allrecipes;