const Redis = require('redis');
const config = require('../config');
var isConnectionBind = false;
var redisConnection = null;

async function init(){
    try{
        if(!isConnectionBind){
            const redis = new Redis.createClient(config.getRedisConnection());
            redisConnection = redis;
            return redis;
        }else{
            return redisConnection;
        }
    }catch(error){
        console.error('Error in redis connection :', error);
        console.error('conection URL :', );
    }
};
init();
module.exports = init;