#!/usr/bin/env node

const http = require('http');
const cheerio = require('cheerio');

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


const parseData = function (data) {
  const $ = cheerio.load(data);
  const titles = $('.findList')
    .first()
    .find('.result_text')
    .map((i, el) => $(el).text())
    .toArray();
  for (let i = 0; i < titles.length; i += 1) {
    console.log(titles[i]);
  }
};

searchIMDB();
