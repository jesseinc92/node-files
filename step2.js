const fs = require('fs');
const process = require('process');
const axios = require('axios');


function cat(path) {

    // read the file located at path
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('Error! ', err);
            process.exit(1);
        }
        console.log(data);
    });
}


async function webCat(path) {

    try {
        // read the url located at path
        let resp = await axios.get(path);
        console.log(resp.data)
    }
    catch (err) {
        console.log('Error! ', err)
    }
}


let path = process.argv[2];

if (path.substr(0, 4) == 'http') {
    webCat(path);
} else {
    cat(path);
}