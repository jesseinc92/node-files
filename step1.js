const fs = require('fs');

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