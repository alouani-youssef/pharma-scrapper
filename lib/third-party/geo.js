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
        if(data){
            return data.features.map((ele) =>{
                return {
                    longitude: ele.geometry.coordinates[0],
                    latitude: ele.geometry.coordinates[1],
                }
            });
        }
    }catch(error){
        console.error('Error :', error);
        return [];
    }
};

module.exports = {getLocationByName}