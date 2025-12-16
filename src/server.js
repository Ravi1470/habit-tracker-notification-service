import express from "express";
import dotenv from "dotenv";
import { ping } from "./api/ping.js";
import handler from "./api/cron.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/ping", async (req, res) => {
  try {
    const result = await ping();
    res.json({ message: "Ping complete", result });
  } catch (error) {
    res.status(500).json({ message: "Ping failed", error: error.message });
  }
});

app.get("/api/notification", async (req, res) => {
  try {
    const res = await handler();
    console.log(res);
  } catch (e) {
    res.status(500).json({ message: "cron failled", error: e.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
