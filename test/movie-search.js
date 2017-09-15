const expect = require('chai').expect;
const { searchIMDB, parseData } = require('../movie-search.js');

describe('searchIMDB', function () {
  it('should be a function', function (done) {
    expect(searchIMDB).to.be.a('function');
    done();
  });
  it('should return an html string', function () {
    searchIMDB("findingnemo", function (done, html) {
      expect(typeof html).to.be.a('string');
      done();
    });
  });
  // it('should return the proper data when passed "thelionking"', function (done, html) {
  //   expect(html).to.equal([ ' The Lion King (1994) ',
  //   ' The Lion King (2019) ',
  //   ' The Last Pinoy Action King (2015) ',
  //   ' The Making of the Lion (2013) ' ])
  // });
});

describe('parseData', function () {
  it('should be a function', function (done) {
    expect(parseData).to.be.a('function');
    done();
  });
});
