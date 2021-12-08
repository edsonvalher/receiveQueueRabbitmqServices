const amqp = require('amqplib/callback_api');
const { log } = require('../helper/tools');

const CONN_URL = "amqp://172.17.0.4:5672";
const { response, request } = require('express')


const receiveQueue = () => {
    log("receiveQueue", "receiving QUEUE");

    amqp.connect(CONN_URL, (connError, connection) => {
        if (connError) {
            throw connError
        }

        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError
            }
            const QUEUE = "user-messages";

            channel.consume(QUEUE, (msg) => {
                log("receiveQueue", JSON.parse(`${msg.content}`));
            },
                {
                    noAck: true //CON ESTO LE DECIMOS A LA COLA QUE HA SIDO CONSUMIDA
                })
        })
    })
    //next();

}

module.exports = {
    receiveQueue,
}