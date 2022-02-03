import rmqService from "../services/rmqService.js";

const handleWebhookRequest = async (topic, shop, webhookRequestBody) => {
  console.log("webhook call received ", topic, shop);
  console.log(webhookRequestBody);

  const message = {
    "shop": shop,
    "topic": topic,
    "createdAt": new Date(),
    "payload": webhookRequestBody
  }
  
  rmqService.publishMessage("shopify-omuni", message, { routingKey: shop });
  return "success";
}


export default { handleWebhookRequest }