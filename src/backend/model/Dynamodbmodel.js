const { ObjectId } = require("bson");
const dynamoose = require("../config/Dynamodb");

const userSchema = new dynamoose.Schema({
  ID: {
    type: String,
    hashKey: true,
    default: () => new ObjectId().toHexString(),
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
});

const User = dynamoose.model("User", userSchema);

module.exports = User;
