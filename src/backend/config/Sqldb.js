const { Sequelize } = require("sequelize");

// Connect to MySQL
const mysql = new Sequelize("myapp", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

// Connect and sync DB
const connectSql= async () => {
  try {
    await mysql.authenticate();
    console.log("✅ Connected to SQL database");

    await mysql.sync();
    console.log("✅ All models synced");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
};

module.exports = { mysql, connectSql};

