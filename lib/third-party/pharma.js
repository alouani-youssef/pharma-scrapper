const axios = require('axios');
const API_KEY = require('../../config').getPharmaAPIKey();


async function fetchPhamacies(longitude,latitude){
    try{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://saydalia.ma/api/siteweb_api.php?origin=${latitude}%2C${longitude}&limit=10000&api_key=${API_KEY}`,
            headers: {}
        };
        const {data } = await axios.request(config);
        console.log('data', data);
        return data;
    }catch(error){
        console.error('Error :', error);
        return [];
    }
};

async function fetchPhamaciesByType(longitude,latitude,type){
    try{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://saydalia.ma/api/siteweb_api.php?origin=${latitude}%2C${longitude}&limit=10000&api_key=${API_KEY}&brand%5B%5D=${type}`,
            headers: {}
        };
        const {data } = await axios.request(config);
        console.log('data', data);
        return data;
    }catch(error){
        console.error('Error :', error);
    }
};

module.exports = { fetchPhamacies, fetchPhamaciesByType  }