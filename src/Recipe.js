class Recipe {
  /**
   * Creates an instance of Recipe.
   * 
   * @param {object} options
   * @param {string} options.name
   * @param {Array<string>} options.ingredients
   * @param {Array<string>} options.instructions
   */
  constructor(options = {
    name: '',
    ingredients: [],
    instructions: []
  }) {
    Object.assign(this, options)
  }
}

module.exports = Recipe;