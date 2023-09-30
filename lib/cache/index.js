const { redisConnection } = require('../../connections');
const redisClient = redisConnection();


const DEFAULT_WAITING_TIME = 100;
const START_VALUE = 0;

class ZonesCacheLayer {
    constructor() {
        this.zonesKey = 'ZONES-ELEMENTS-V6';
        this.lengthKey = 'ZONES-ELEMENTS-LENGTH-V6';
        this.executedKey = 'ZONES-ELEMENTS-EXECUTED-V6';
        this.length = null;
        this.getCounter = START_VALUE;
        this.setCounter = START_VALUE;
        this.waitingTime = START_VALUE;
    }

    async setZone(zone){
        this.setCounter ++;
        const key = this.setCounter.toString()
        console.log('ZONE WITH ID : ', zone.id, ' WITH THE COUNTER :',key, ' HAVE BEEN SET IN CACHE LAYER SUCCESSFULLY' )
        const data = await redisClient.hset(this.zonesKey,key,JSON.stringify(zone));
        await redisClient.set(this.lengthKey,this.setCounter.toString());
        await  redisClient.set(this.executedKey,'0')
        return data;
    }
    async getZonesLentgh(){
       const length =  await redisClient.get(this.lengthKey);
       this.length = parseInt(length,10);
       return this.length;
    }
    async getNext(){
        console.error('this.getCounter < this.length', (this.getCounter < this.length))
        if (this.getCounter > this.length){
            return null
        }
        else{
            this.getCounter++;
            this.waitingTime += DEFAULT_WAITING_TIME;
            await redisClient.set(this.executedKey,this.getCounter.toString());
            return new Promise(async (resolve,reject) =>{
                setTimeout(async (zonesKey,getCounter) =>{
                    try{
                        const nextUser = await redisClient.hget(zonesKey, getCounter.toString());
                        resolve(JSON.parse(nextUser));
                    }catch(error){
                        reject(error)
                    }
                }, this.waitingTime,this.zonesKey,this.getCounter)
            })
        }
    }
    async init() {
        const length = await this.getZonesLentgh();
        const counter = await  redisClient.get(this.executedKey);
        this.getCounter = parseInt(counter,10) + 1;
        return length;
    }
    async getNextUser() {

    }
    async clearZone() {
        return 
    }
};
const cacheLayer = new ZonesCacheLayer();
module.exports = cacheLayer;