import Broker from "rascal";
import rmqConfig from "../config/rmqConfig.js";

async function publishMessage(exchange, message, routingKey) {
    try {
        console.log("Publishing");
        const broker = await Broker.BrokerAsPromised.create(rmqConfig.config);
        broker.on('error', console.error);
        const publication = await broker.publish(exchange, message, routingKey);
        publication.on('error', console.error);
        console.log("Published")
    } catch (exception) {
        console.error('error in publishing ', exception)
    }
}

export default {
    publishMessage
}