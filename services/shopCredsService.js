import db from "./dbService.js";

async function getShopCreds(shop) {
    const results = await db.query(`select * from shop_creds where shop = ?`, [shop]);
    console.log(results)
    return results;
}

async function insertShopCreds(sessionJson) {
    const query = `insert into shop_creds(id,shop,state,isOnline,access_token,scope) values(?,?,?,?,?,?)`;
    const params = [sessionJson.id, sessionJson.shop, sessionJson.state, sessionJson.isOnline, sessionJson.accessToken, sessionJson.scope];
    const result = await db.query(query, params);
    return result
}

async function deleteShopCreds(shop) {
    const result = await db.query(`delete from shop_creds where shop = ?`, [shop]);
    console.log('deleting shop creds shop: ',shop,' response: ',result)
    return result
}

export default {
    getShopCreds,
    insertShopCreds,
    deleteShopCreds
}
