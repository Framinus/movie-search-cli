#!/usr/bin/env node

const http = require('http');
const cheerio = require('cheerio');

const searchTerm = process.argv[2];

const parseData = function (data) {
  const $ = cheerio.load(data);
  const titleArray = [];
  const titles = $('.findList')
    .first()
    .find('.result_text')
    .map((i, el) => $(el).text())
    .toArray();
  for (let i = 0; i < titles.length; i += 1) {
    // added so there is value returned to test.
    titleArray.push(titles[i]);
    // this is actually what prints results.
    console.log(titles[i]);
  }
  return titleArray;
};

const searchIMDB = function (search) {
  let html;
  http.get({
    host: 'www.imdb.com',
    path: `http://www.imdb.com/find?q=${search}&s=tt&ttype=ft&ref_=fn_ft`,
  }, (response) => {
    html = '';
    response.on('data', (chunk) => {
      html += chunk;
    });
    response.on("end", () => {
      parseData(html);
    });
    response.on("error", (error) => {
      console.log("Error reading page data");
    });
  });
  return html;
};

searchIMDB(searchTerm);

module.exports = { searchIMDB, parseData };
