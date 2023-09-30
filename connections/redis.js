const Redis = require('ioredis');
const config = require('../config');


function init(){
    try{
        return new Redis();
    }catch(error){
        console.error('Error in redis connection :', error);
        console.error('conection URL :', );
    }
};
module.exports = init;