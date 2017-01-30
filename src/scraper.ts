import * as url from 'url';

import providers from './providers/index';

/**
 * Goes through all the URLs and begins scraping each based on their domain
 */
export default function beginScraping(token: string, urls: Array<string>) {
  urls.forEach(recipeUrl => {
    const urlParts = url.parse(recipeUrl);

    const matches = Object.keys(providers).some(key => {
      const provider = providers[key];

      if (provider.hostname == urlParts.hostname) {
        provider.scrape(recipeUrl);
        return true;
      }
    });

    if (!matches) {
      console.log(`No scrapers matched: ${recipeUrl}`);
    }
  });
}