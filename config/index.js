const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env') });

class Configuration{
    constructor(){
        this.isInProduction =  process.env.MODE_DEV === 'dev';
        this.systemAvailability = null;
    }
    getMongoConnection(){
        return process.env.MONGODB_URI;              
    }
    getRedisConnection(){
        return process.env.MODE_DEV;              
    }
    getPharmaAPIKey(){
        return process.env.PHARMA_SOURCE_KEY;              
    }
    getGeoAPIKey(){
        return process.env.GEO_API_KEY;              
    }
    getPort(){
        return parseInt( process.env.PORT,10)
    }
    getSystemAvailability(){
        return this.systemAvailability;
    }
    setSystemAvailabilityOff(){
        this.systemAvailability = false;
        return this.systemAvailability;
    }
    setSystemAvailabilityOn(){
        this.systemAvailability = true;
        return this.systemAvailability;
    }
}
const configuration = new Configuration();
module.exports = configuration;