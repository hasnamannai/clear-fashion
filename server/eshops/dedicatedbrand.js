/*const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');*/

/*
/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
/*
const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
          
      );
      /*const link = parseInt(
        $(element)
          .find('.productList-price')
          .text()
          .attr('href')
      );*/
/*
      return {name,price};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
/*
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/*const writeToFile = (file1, data) => {
  fs.writeFile(file1, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Data has been written to ${file1}`);
  });
};
*/
const fetch = require('node-fetch');
const cheerio = require('cheerio');

fetch('https://shop.circlesportswear.com/collections/collection-femme')
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body);
        const elements = $('div[class="card-wrapper underline-links-hover"]');
        elements.each((i, element) => {
            console.log($(element).text());
        });
    });