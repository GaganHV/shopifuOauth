import express from "express";
import dotenv from "dotenv";
import {Shopify} from "@shopify/shopify-api";
dotenv.config();

const host="127.0.0.1";
const port=9004;

const{SHOPIFY_API_KEY,SHOPIFY_API_SECRET,SHOPIFY_SCOPES,HOST}=process.env;
const shops ={};
Shopify.Context.initialize({
    API_KEY: SHOPIFY_API_KEY,
    API_SECRET_KEY: SHOPIFY_API_SECRET,
    SCOPES: SHOPIFY_SCOPES,
    HOST_NAME: HOST,
    IS_EMBEDDED_APP: false,
})

var token = "gc"

const app = express();
app.get('/',async(req,res)=>{
    if(typeof shops[req.query.shop]!=='undefined'){
        res.send(token)
    }else{
res.redirect(`/auth?shop=${req.query.shop}`);
    }
})

app.get('/auth',async(req,res)=>{
    const authroute = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        '/auth/callback',
        false
    )
    res.redirect(authroute)
}) 

app.get('/auth/callback',async(req,res)=>{
    token =await Shopify.Auth.validateAuthCallback(req,res,req.query);
    console.log(token);
    shops[token.shop]=token;
    res.redirect(`https://${token.shop}/admin/apps/oauthg`)
})

app.listen(port,()=>{
    console.log("Welcome to OMUNI")
})
