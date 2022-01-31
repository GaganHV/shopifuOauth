import dotenv from "dotenv";
import mysql from "mysql2/promise"
dotenv.config();

const{MYSQL_HOST,MYSQL_USER,MYSQL_PASS,MYSQL_DATABASE}=process.env;


const pool =mysql.createPool({ 
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DATABASE
  });


export default {pool};