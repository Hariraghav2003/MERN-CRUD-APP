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

// Connect to database
connectSql();
connectDb();

// Routes
app.use("/mongo",mongoRoutes);
app.use("/sql",sqlRoutes);
app.use("/dynamo",dynamoRoutes)

const port = process.env.PORT || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});
