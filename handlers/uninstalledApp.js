import shopCredsService from "../services/shopCredsService.js";
const handleWebhookRequest = async (topic, shop, webhookRequestBody) => {
    console.log("webhook call received ", topic, shop);
    await shopCredsService.deleteShopCreds(shop);
    return "success";
}


export default { handleWebhookRequest }