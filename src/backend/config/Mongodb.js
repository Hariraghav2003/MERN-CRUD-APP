const mongo = require('mongoose');
const dotenv=require("dotenv");
dotenv.config();
const connectDb= async () => {
    try {
        await mongo.connect(process.env.MONGO_DB_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error)
    }
}
module.exports=connectDb;