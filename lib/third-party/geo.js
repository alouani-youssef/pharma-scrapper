const axios = require('axios');
const API_KEY = require('../../config').getGeoAPIKey();

async function getLocationByName(text){
    try{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.geoapify.com/v1/geocode/search?text=${text}&apiKey=${API_KEY}`,
            headers: { }
        };
        const {data } = await axios.request(config);
        console.log('data', data);
        // data.features.map((ele) => ele.geometry.coordinates);
        return data;
    }catch(error){
        console.error('Error :', error);
        return [];
    }
};