

const axios = require('axios');
const https = require('https');

const agent = new https.Agent({ rejectUnauthorized: false });

const { ListDiseasesExtracter, ListDrugsExtracter } = require('../../utils/html-parser');

async function getDiseasesListByLetter(letter){
    try{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://www.webteb.com/diseases/list/${letter}`,
            headers: { 
                'Cookie': 'UUID_DMS=3af49dc6-97fb-4eb0-823a-c2c08f22c807; country-code=MA'
            },
            httpsAgent: agent 
        };

        const { data } = await axios.request(config);
        if(data){
            const diseasesList =  ListDiseasesExtracter(data);
            return diseasesList;
        }
    }catch(error){
        console.error('Error :', error);
        return null;
    }
};


async function getDrugsListByLetter(letter){
    try{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://www.webteb.com/drug/list/${letter}`,
            headers: { 
                'Cookie': 'UUID_DMS=3af49dc6-97fb-4eb0-823a-c2c08f22c807; country-code=MA'
            },
            httpsAgent: agent 
        };

        const { data } = await axios.request(config);
        if(data){
            const drugsList =  ListDrugsExtracter(data);
            return drugsList;
        }
    }catch(error){
        console.error('Error :', error);
        return null;
    }
};




function numberToLetter(number) {
    return String.fromCharCode(97 + number); // 97 is the ASCII code for 'a' , 25+97 = z
};


async function getDiseasesList(){
        return Promise.all(Array(26).fill().map((_, i) => i).map(async (counter) =>{
            const letter = numberToLetter(counter);
            const diseasesList = await getDiseasesListByLetter(letter);
            return diseasesList;
        }));
};

async function getDrugsList(){
    return Promise.all(Array(26).fill().map((_, i) => i).map(async (counter) =>{
        const letter = numberToLetter(counter);
        const drugsList = await getDrugsListByLetter(letter);
        return drugsList;
    }));
}


module.exports = { getDiseasesList , getDrugsList}