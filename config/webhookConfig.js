import createOrder from "../handlers/createOrder.js";
import cancelOrder from "../handlers/cancelOrder.js";
import paymentUpdate from "../handlers/paymentUpdate.js";
import uninstalledApp from "../handlers/uninstalledApp.js";

const webhookHandlers = {
    "ORDERS_CREATE": {
        path: "/webhooks",
        webhookHandler: createOrder.handleWebhookRequest,
    },
    "ORDERS_CANCELLED": {
        path: "/webhooks",
        webhookHandler: cancelOrder.handleWebhookRequest,
    },
    "ORDERS_PAID": {
        path: "/webhooks",
        webhookHandler: paymentUpdate.handleWebhookRequest,
    },
    "APP_UNINSTALLED": {
        path: "/webhooks",
        webhookHandler: uninstalledApp.handleWebhookRequest,
    }
}

function getAllRegsiterWebhooks(token) {
    return {
        path: '/webhooks',
        topic: 'ORDERS_CREATE',
        accessToken: token.accessToken,
        shop: token.shop,
    }, {
        path: '/webhooks',
        topic: 'ORDERS_CANCELLED',
        accessToken: token.accessToken,
        shop: token.shop,
    },
    {
        path: '/webhooks',
        topic: 'ORDERS_PAID',
        accessToken: token.accessToken,
        shop: token.shop,
    },
    {
        path: '/webhooks',
        topic: 'APP_UNINSTALLED',
        accessToken: token.accessToken,
        shop: token.shop,
    }
}

export default { webhookHandlers, getAllRegsiterWebhooks};