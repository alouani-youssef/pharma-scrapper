const fs = require('fs');
const readline = require('readline');
const path = require('path');
const JSONStream = require('jsonstream');

const filePath = path.join(__dirname, '../../input/cities.json');

const fileStream = fs.createReadStream(filePath);

async function objecyProcessor(callback){
    try{
        const readLine = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
          });
          const parser = JSONStream.parse('*');
          
          parser.on('data', (data) => {
            try{
                console.log(data);
                callback(data);
            }catch(error){
                console.error(error);
                process.exit(0);
            }
          });
          readLine.on('close', () => {
            console.log('Finished reading the JSON file.');
          });
          
          fileStream.pipe(parser).pipe(readLine);
    }catch(error){

    }
};
module.exports = { objecyProcessor }