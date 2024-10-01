import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
async function testConnection() {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS solution");
    console.log("La solution est :", rows[0].solution);
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données:", error);
  }
}
testConnection();
export default db;
