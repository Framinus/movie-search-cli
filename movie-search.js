#!/usr/bin/env node

const http = require('http');
const cheerio = require('cheerio');

const parseData = function (data) {
  const $ = cheerio.load(data);
  const titles = $('.findList')
    .first()
    .find('.result_text')
    .map((index, element) => $(element).text())
    .toArray();

  for (let index = 0; index < titles.length; index += 1) {
    console.log(titles[index]);
  }
};

const searchIMDB = function () {
  const searchTerm = process.argv[2];
  http.get({
    host: 'www.imdb.com',
    path: `http://www.imdb.com/find?q=${searchTerm}&s=tt&ttype=ft&ref_=fn_ft`,
  }, (response) => {
    let html = '';
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
};

module.exports = { searchIMDB, parseData };
