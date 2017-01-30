import * as request from 'request';
import * as cheerio from 'cheerio';

export default function (url: string): Promise<CheerioStatic> {
  return new Promise<CheerioStatic>((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err)
        return reject(err);

      if (response.statusCode !== 200)
        return reject(response.statusCode);

      resolve(cheerio.load(body))
    })
  })
}