

const axios = require('axios');
const API_KEY = require('../../config').getGeoAPIKey();

async function getLocationByName(id){
    try{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://dmp.sante.gov.ma/getmedecinedata/6004/${id}`,
            headers: { }
        };
        const { data } = await axios.request(config);
        if(data){
            // this shoudl return an object with the following properites
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