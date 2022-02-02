
const handleWebhookRequest = async (topic, shop, webhookRequestBody) => {
    console.log("webhook call received ",topic,shop);
    console.log(webhookRequestBody);
    return "success";
  }
  

  export default {handleWebhookRequest}