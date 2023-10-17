const configuration = require('../../config');
const DEFAULT_VALUES = {
    IP:'DEFAULT-IP',
    USER_AGENT:'USER-AGENT',
    KOMOTIS_HEADER:'KOMOTIS-DEFAULT-HEADER'
}
function systemAvailability(){
    return  function (req, res, next){
        try{
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            const isAvailable =configuration.getSystemAvailability();
            if(isAvailable){
                res.setHeader('x-Provided-By', 'webhealth');
                next();
            }else{
                res.setHeader('x-Provided-By', 'webhealth');
                res.setHeader('x-webhealth', 'No-Availability');
                res.status(500);
                res.json({error:'OUR SYSTEM IS NOT AVIALABLE FOR THE MOMENT, PLEASE TRY LATER'});
            }
        }catch(error){
            res.setHeader('x-Provided-By', 'webhealth');
            res.setHeader('x-webhealth', 'No-Availability');
            res.status(500);
            res.json({error:'OUR SYSTEM IS NOT AVIALABLE FOR THE MOMENT, PLEASE TRY LATER'});
        }
    }
}

function userRecognition(){
    return  function (req, res, next){
        try{
            
            const userAgent =  req.get('User-Agent');
            const IP = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;
            const fingerPrint = req.headers['x-webhealth-finger'];
            req.recognition = { userAgent: userAgent,IP:IP,fingerPrint:fingerPrint };
            next();
        }catch(error){
            req.recognition = { userAgent:DEFAULT_VALUES.USER_AGENT,IP:DEFAULT_VALUES.IP,fingerPrint:DEFAULT_VALUES.KOMOTIS_HEADER };
            next();
        }
    }
};

module.exports = {userRecognition,systemAvailability}
