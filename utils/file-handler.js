const fs = require('fs');

async function addDiseasesList(diseasesList){
    const filePath = '/root/home/youssef/Desktop/pharma-scrapper/out/diseases.json';
    let jsonData = [];
    try {
      jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      console.error('Error reading JSON file:', err);
    }
    jsonData = jsonData.concat(diseasesList);
    try {
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
      console.log('Data injected into the JSON file successfully.');
    } catch (err) {
      console.error('Error writing JSON file:', err);
    }
};

module.exports = { addDiseasesList }