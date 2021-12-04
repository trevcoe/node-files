const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function(err){
            if (err) {
                console.error(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

async function webCat(url){
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path = process.argv[2];

if (path.slice(0,4) === 'http'){
    webCat(path);
} else {
    cat(path);
}



