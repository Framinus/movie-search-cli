const http = require('http');
const cheerio = require('cheerio');

// const searchTerm = process.argv[2];

// const url = `http://www.imdb.com/find?ref_=nv_sr_fn&q=${searchTerm}&s=all`;

// searches are in <td class='result_text'>
// <td class="result_text"> <a href="/title/tt0401422/?ref_=fn_al_tt_2">Finding Nemo</a> (2003) (Video Game) </td>
const searchIMDB = function () {
  const searchTerm = process.argv[2];
  http.get({
    host: 'www.imdb.com',
    path: `/find?ref_=nv_sr_fn&q=${searchTerm}&s=all`,
  }, (response) => {
    let html = '';
    response.on('data', (chunk) => {
      html += chunk;
    });
    response.on("end", () => {
      parseData(html);
    });
    response.on("error", (error) => {
      console.log(error);
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
  console.log(titles);
};

searchIMDB();
