// backend/src/server.js
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./lib/db.js";

dotenv.config();
const PORT = process.env.PORT || 8004;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};
start();