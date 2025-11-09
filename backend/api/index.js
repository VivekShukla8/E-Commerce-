// backend/api/index.js
import dotenv from "dotenv";
import app from "../src/app.js";
import connectDB from "../src/lib/db.js";

dotenv.config();

let dbReady;
export default async function handler(req, res) {
  if (!dbReady) {
    dbReady = connectDB().catch((e) => {
      dbReady = null;
      throw e;
    });
  }
  await dbReady;
  return app(req, res);
}