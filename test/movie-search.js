const expect = require('chai').expect;
const http = require('http');
const { searchIMDB, parseData } = require('../movie-search.js');

describe('searchIMDB', function () {
  it('should be a function', function () {
    expect(searchIMDB).to.be.a('function');
  });
  it('should return data if get request is successful', function () {
    let html = '';
    http.get({
      host: 'www.imdb.com',
      path: `http://www.imdb.com/find?q=findingnemo&s=tt&ttype=ft&ref_=fn_ft`,
    }, (response) => {
      response.on('data', (chunk) => {
        html += chunk;
      });
      return html;
    });
  });
  // expect().to.equal('');
});

describe('parseData', function () {
  it('should be a function', function () {
    expect(parseData).to.be.a('function');
  });
  // this test currently throws a callback error before running.
  it('returns the correct data', function () {
    searchIMDB("thelionking");
    expect(parseData(data)).to.equal([ ' The Lion King (1994) ',
  ' The Lion King (2019) ',
  ' The Last Pinoy Action King (2015) ',
  ' The Making of the Lion (2013) ' ]);
  });
});
