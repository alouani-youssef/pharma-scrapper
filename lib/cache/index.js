const { redisConnection } = require('../../connections');
const redisClient = redisConnection();

const DEFAULT_WAITING_TIME = 100;
const START_VALUE = 0;

class ZonesCacheLayer {
    constructor() {
        this.zonesKey = 'ZONES-ELEMENTS';
        this.lengthKey = 'ZONES-ELEMENTS-LENGTH';
        this.executedKey = 'ZONES-ELEMENTS-EXECUTED';
        this.length = null;
        this.getCounter = START_VALUE;
        this.setCounter = START_VALUE;
        this.waitingTime = DEFAULT_WAITING_TIME;
    };
    async setZone(zone){
        this.setCounter++;
        const zone = await redisClient.hset(this.zonesKey,this.setCounter.toString(),JSON.stringify(zone));
        await redisClient.set(this.zonesKey,this.setCounter.toString());
        return zone;
    }
    async getZonesLentgh(){
       const length =  await redisClient.set(this.zonesKey,this.setCounter.toString());
       this.length = parseInt(length,10);
       return this.length;
    }
    async getNext(){
        if (this.length < this.getCounter){
            return null
        }
        else{
            this.getCounter++;
            this.waitingTime += this.waitingTime
            await redisClient.set(this.executedKey,this.getCounter.toString());
            return new Promise(async (resolve,reject) =>{
                setTimeout(async (zonesKey,getCounter) =>{
                    try{
                        const nextUser = await OutBoxingRedis.hget(zonesKey, getCounter.toString());
                        resolve(JSON.parse(nextUser));
                    }catch(error){
                        reject(error)
                    }
                }, this.waitingTime,this.zonesKey,this.getCounter)
            })
        }
    }
    async init() {
        this.getZonesLentgh();
        const counter = await  redisClient.get(this.executedKey);
        this.getCounter = parseInt(counter,10) -1;
    }
    async getNextUser() {

    }
    async clearZone() {
        return 
    }
};
const cacheLayer = new ZonesCacheLayer();
module.exports = ZonesCacheLayer;