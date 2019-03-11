
const readline = require('readline');
const CityData = require('./city_data.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('Please enter the city name/abbreviation to search (Type exit to quit) : ');

const cd = new CityData();

(async function () {
    var data = await cd.loadData();

    rl.prompt();
    rl.on('line', function (line) {
        if (line === "exit") {
            rl.close();
        }
        var res = cd.search(line);
        if (res != null) {
            cd.printResult(res);
        } else {
            console.log('Not found');
        }
        rl.prompt();
    }).on('close', function () {
        process.exit(0);
    });
})();
