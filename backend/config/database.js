const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env file
dotenv.config({ path: "backend/config/config.env" });

const connectDatabase = () => {
  if (!process.env.DB_URI) {
    console.error("❌ DB_URI is missing in config.env");
    process.exit(1);
  }

  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("✅ Database connected successfully.."))
    .catch((err) => console.error("❌ DB connection error:", err));
};

module.exports = connectDatabase;
