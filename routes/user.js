const { Router } = require('express');
let router = Router();
const { publishToQueue } = require('../services/MQService');

router.post('/send',async (req,res,next)=>{
    let message = req.body.message;
    let queue = req.body.queue;
    res.statusCode = 200;
    res.data = {"message":message,"queue": queue};
    next();
});


router.post('/msg',async(req,res,next)=>{
    let {queueName,payload} = req.body;
    await publishToQueue(queueName,payload);
    res.statusCode = 200;
    res.data = {"message-sent":true};
    next();
})

module.exports = router;