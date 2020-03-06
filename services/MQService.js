const amqp = require('amqplib/callback_api');
const CONN_URL = 'amqp://xziwrlrg:zuMasbC_t2UWKfXgiwcNM2axY8Q0Keaq@shark.rmq.cloudamqp.com/xziwrlrg';
const multichain = require("multichain-node")({
    port: 9708,
    host: '127.0.0.1',
    user: 'multichainrpc',
    pass: '7FPiat2QdYsMuWhx11qiU1gZ826SEoGiti6kx1688YjZ',
});
 
let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
    });
});

module.exports = publishToQueue = async (queueName, data) => {
 //   ch.sendToQueue(queueName, new Buffer(data), {persistent: true});
    ch.assertQueue(queueName, {  durable: false });
    ch.consume(queueName, function(data,res,next) {
        multichain.publish(['stream11', queueName, {"text":data.content.toString()}]
         , (err, info) => {
             if(err) {
               throw err;
             }

             res.data = {"txt-id":info}
             ch.sendToQueue(queueName, new Buffer(info), {persistent: true});
           });
    }, {
        noAck: true
    });
  ///  next();
}

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});