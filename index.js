import express from "express";
import dotenv from "dotenv";
import { Shopify, ApiVersion } from "@shopify/shopify-api";
import shopCredsService from './services/shopCredsService.js';
import webhookConfig from "./config/webhookConfig.js";

dotenv.config();

const host = "127.0.0.1";
const port = 9004;

const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_SCOPES, HOST } = process.env;
var token = "token"
Shopify.Context.initialize({
    API_KEY: SHOPIFY_API_KEY,
    API_SECRET_KEY: SHOPIFY_API_SECRET,
    SCOPES: SHOPIFY_SCOPES,
    HOST_NAME: HOST,
    API_VERSION: ApiVersion.October21,
    IS_EMBEDDED_APP: false,
})

const app = express();

app.get('/', async (req, res) => {
    const creds = await shopCredsService.getShopCreds(req.query.shop);
    if (req.query.isRedirect) {
        res.status(200).json(creds)
    }
    else if (creds.length != 0) {
        res.redirect(`https://${req.query.shop}/admin/apps/oauthg?isRedirect=yes`)
    } else {
        res.redirect(`/auth?shop=${req.query.shop}`);
    }
})

app.get('/auth', async (req, res) => {
    const authroute = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        '/auth/callback',
        false
    )
    res.redirect(authroute)
})

app.get('/auth/callback', async (req, res) => {
    token = await Shopify.Auth.validateAuthCallback(req, res, req.query);
    console.log(token);
    console.log(token);


    const responseWebhook = await Shopify.Webhooks.Registry.registerAll(webhookConfig.getAllRegsiterWebhooks(token));
    console.log(responseWebhook);

    await shopCredsService.insertShopCreds(token);

    res.redirect(`https://${token.shop}/admin/apps/oauthg`)
})

app.listen(port, () => {
    console.log("Welcome to OAUTH")
})


app.get('/shop', async function (req, res, next) {
    try {
        res.status(200).json(await shopCredsService.getShopCreds(req.query.shop));
    } catch (err) {
        console.error(`Error while getting shop creds `, err.message);
        next(err);
    }
});

app.post('/webhooks', async (req, res) => {
    try {
        await Shopify.Webhooks.Registry.process(req, res);
    } catch (error) {
        console.log(error);
    }
});

Shopify.Webhooks.Registry.addHandlers(webhookConfig.webhookHandlers);