const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const {connectSql} = require("./config/Sqldb");
const connectDb = require("./config/Mongodb");
const mongoRoutes=require("./routes/Usermongoroutes");
const sqlRoutes = require("./routes/Usersqlroutes");
const dynamoRoutes=require("./routes/Dynamodbroute")
dotenv.config(); 

const app = express();
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  connectSql();
  connectDb();
}


const allowedOrigins = [
  "http://localhost:3000"  
];

// Middleware to reject requests with unauthorized origin
app.use((req, res, next) => {
  const origin = req.headers.origin || req.headers.referer;

  if (allowedOrigins.includes(origin)) {
    next(); // origin is allowed
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Routes
app.use("/mongo",mongoRoutes);
app.use("/sql",sqlRoutes);
app.use("/dynamo",dynamoRoutes)

module.exports = app;

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is listening on port ${port}`);
  });
}
