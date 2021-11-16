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


function catWrite(path, filename) {

    // read the file located at path
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('Error! ', err);
            process.exit(1);
        }

        // write the data to filename
        fs.writeFile(filename, data, 'utf8', err => {
            if (err) {
                console.log("Couldn't write to ", filename);
                console.log('Error ', err);
            }
        });
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


async function webCatWrite(path, filename) {

    try {
        // read the url located at path
        let resp = await axios.get(path);
        
        // write to the filename
        fs.writeFile(filename, resp.data, 'utf8', err => {
            if (err) {
                console.log("Couldn't write to ", filename);
                console.log('Error ', err);
            }
        });
    }
    catch (err) {
        console.log('Error! ', err)
    }
}


if (process.argv[2] == '--out') {
    let filename = process.argv[3];
    let path = process.argv[4];
    if (path.substr(0, 4) == 'http') {
        webCatWrite(path, filename);
    } else {
        catWrite(path, filename);
    }
} else {
    let path = process.argv[2];
    if (path.substr(0, 4) == 'http') {
        webCat(path);
    } else {
        cat(path);
    }
}