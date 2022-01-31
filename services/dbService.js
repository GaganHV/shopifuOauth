import mySqlPool from "../config/dbconfig.js";


async function query(sql, params) {
  const [result,] = await mySqlPool.pool.query(sql, params);
  return result;
}

export default {
  query
}