require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test Database Connection
    const connection = await pool.getConnection();
    console.log("✅ Connected to MySQL Database");
    connection.release();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
  }
}

startServer();