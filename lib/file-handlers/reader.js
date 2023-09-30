const fs = require('fs');
const readline = require('readline');
const path = require('path');
const JSONStream = require('jsonstream');

const cacheLayer = require('../cache');


const filePath = path.join(__dirname, '../../input/cities.json');

const fileStream = fs.createReadStream(filePath);

async function objecyProcessor(callback){
    try{
        const processing = new Promise((resolve,reject) =>{
            const readLine = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
              });
              const parser = JSONStream.parse('*');
              
              parser.on('data', (data) => {
                try{
                 cacheLayer.setZone(data);
                }catch(error){
                    console.error(error);
                    process.exit(0);
                }
              });
              readLine.on('close', () => {
                console.log('Finished reading the JSON file.');
                resolve(true)
              });
              
              fileStream.pipe(parser).pipe(readLine);
        });
        return processing;
    }catch(error){

    }
};
module.exports = objecyProcessor