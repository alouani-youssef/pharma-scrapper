const {Zone} = require("../../src/models");

const DEFAULT_WAITING_TIME = 1000;
const START_VALUE = 0;

class ZonesCusorLayer {
  constructor() {
    this.waitingTime = START_VALUE;
    this.cursor = null;
  }
  async getNext() {
    this.waitingTime += DEFAULT_WAITING_TIME
    return new Promise(async (resolve, reject) => {
      setTimeout(
        async (cursor) => {
          try {
            const nextZone = await cursor.next();
            if(nextZone){
                resolve(nextZone);
            }else{
                resolve(null);
            }
          } catch (error) {
            reject(error);
          }
        },
        this.waitingTime,
        this.cursor
      );
    });
  }
  async init() {
    const cursor = Zone.find({}).sort({ createdAt: -1 }).cursor();
    const length = await Zone.count();
    this.cursor = cursor;
    return length;
  }
}
const CusorLayer = new ZonesCusorLayer();
module.exports = CusorLayer;
