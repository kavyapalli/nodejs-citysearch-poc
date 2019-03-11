
var assert = require('assert');
const CityData = require('./city_data.js');

describe('Testing Case - 1', function () {

    var res = null;
    const cd = new CityData();

    before(done => {
        console.log('Loading data before test case starts...');
        (async function(){
            await cd.loadData();
            done();
        })();
    });

    it('Searching city by name Alabama, Should return Alabama', function () {
        res = cd.search('Alabama');
        assert.equal(res.name, 'Alabama');
    });

    it('Searching city by abbreaviation AL, Should return Alabama', function () {
        res = cd.search('Alabama');
        assert.equal(res.name, 'Alabama');
    });

    it('Searching city by abbreaviation al (lower case), Should return Alabama', function () {
        res = cd.search('Alabama');
        assert.equal(res.name, 'Alabama');
    });

    it('Searching AK, Should return Alaska', function () {
        res = cd.search('Alaska');
        assert.equal(res.name, 'Alaska');
    });

    it('Searching Mumbai, Should be null', function () {
        res = cd.search('Mumbai');
        assert.equal(res, null);
    });


    afterEach(function () {
        cd.printResult(res);
    });
});
