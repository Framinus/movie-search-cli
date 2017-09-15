const http = require('http');
const cheerio = require('cheerio');

const searchTerm = process.argv[2];

const url = `http://www.imdb.com/find?ref_=nv_sr_fn&q=${searchTerm}&s=all`;

// searches are in <td class='result_text'>
// <td class="result_text"> <a href="/title/tt0401422/?ref_=fn_al_tt_2">Finding Nemo</a> (2003) (Video Game) </td>

http.get(url, (response) => {
  response.setEncoding("utf-8");
  response.on("data", (data) => {
    const myHtml = data;
    console.log(myHtml);
  });
  response.on("error", (error) => {
    console.log("oh noes!");
  });
});
