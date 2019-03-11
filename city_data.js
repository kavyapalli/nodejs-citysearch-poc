var request = require('request');
var assert = require('assert');

module.exports = function CityData() {

    var data = null;

    /**
     * 
     */
    this.getData = async function () {

        console.log('API call');

        return new Promise((resolve, reject) => {

            request.get({
                url: 'http://services.groupkt.com/state/get/USA/all',
                /* proxy: 'http://0.0.0.0:xxxx', */
            }, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(null);
                } else {
                    resolve(res);
                }
            });

        });

    }

    /**
     * 
     * @param {*} done 
     */
    this.loadData = async function () {

        console.log('Loading data')
        data = await this.getData();

        if (data.statusCode != 200) {
            console.log('Error found');
            return;
        }

        var resp = JSON.parse(data.body);

        if (!resp.RestResponse.result) {
            console.log('No Data');
        }

        console.log('Data loaded')

        data = resp.RestResponse.result;

        return data;
    }


    /**
     * 
     * @param {*} searchText 
     */
    this.search = function (searchText) {

        // console.log('Searching...' + searchText);
        searchText = searchText.toLowerCase();

        var result = null;

        data.every(element => {


            var name = element.name.toLowerCase();
            var abbr = element.abbr.toLowerCase();

            if (name == searchText || abbr == searchText) {
                result = element;
                return false;
            }

            return true; ``
        });

        return result;
    }

    /**
     * 
     * @param {*} element 
     */
    this.printResult = function (element) {
        if (element == null) {
            return;
        }
        console.log('       Name         : ' + element.name);
        console.log('       Abbr         : ' + element.abbr);
        console.log('       Capital      : ' + element.capital);
        console.log('       Largest City : ' + element.largest_city);
        console.log('       Area         : ' + element.area);
    }

}