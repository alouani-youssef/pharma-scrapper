const moment = require('moment-timezone');

function availablityType() {
  const moroccoTimeZone = 'Africa/Casablanca';
  const now = moment().tz(moroccoTimeZone);
  const isWorkday = now.isoWeekday() >= 1 && now.isoWeekday() <= 6;
  if(isWorkday){
    const isNormalType = ( (now.hours() >= 9 && now.hours() < 13)  || (now.hours() >= 14 && now.hours() < 18)   )
    const isDayType = (now.hours() >= 9 && now.hours() < 21);
    const isNighType = (now.hours() >= 21 && now.hours() < 24);
    if(isNormalType){
        return 'NORMAL'
    }
    else if(isDayType){
        return 'DAY';
    }else if(isNighType){
        return 'NIGHT';
    } else {
        return 'FULL'
    }
  }else {
    const isNormalType = ( (now.hours() >= 9 && now.hours() < 13)  || (now.hours() >= 14 && now.hours() < 18)   )
    const isDayType = (now.hours() >= 9 && now.hours() < 21);
    const isNighType = (now.hours() >= 21 && now.hours() < 24);
    if(isNormalType){
        return 'NORMAL'
    }
    else if(isDayType){
        return 'DAY';
    }else if(isNighType){
        return 'NIGHT';
    } else {
        return 'FULL'
    }
  }
};

module.exports = { availablityType }