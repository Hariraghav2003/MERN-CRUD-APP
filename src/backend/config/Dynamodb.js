require("dotenv").config();
const dynamoose = require("dynamoose");

const isOffline = process.env.IS_OFFLINE === "true";

if (isOffline) {
  const { DynamoDB } = require("@aws-sdk/client-dynamodb");

  const ddb = new DynamoDB({
    endpoint: "http://localhost:8000",
    region: "local",
    credentials: {
      accessKeyId: "fakeMyKeyId",
      secretAccessKey: "fakeSecretKey",
    },
  });

  dynamoose.aws.ddb.set(ddb); 
  console.log("✅ Connected to DynamoDB Local");
} else {
  dynamoose.aws.sdk.config.update({
    region: process.env.AWS_REGION || "us-west-2",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  console.log("✅ Connected to AWS DynamoDB");
}

module.exports = dynamoose;
