const rateLimit = require('express-rate-limit');

function keyGenerator(req){
    return `${req.recognition.userAgent}-${req.recognition.userAgent}`

}

const limiter = rateLimit({
    windowMs: 1000,
    max: 10,
    keyGenerator: keyGenerator,
    handler: (req, res) => {
      res.status(429).json({code: 'WEB-HEALTH-ERROR-0', error: 'Rate Limit Exceeded, You Are Banned!' });
    },
});

module.exports = { rateLimit }