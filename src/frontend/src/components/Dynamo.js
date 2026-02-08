import { useState } from "react";
import Dynamodbcreatebutton from "./Dynamodbcreatebutton";
import Dynamodblist from "./Dynamodblist";

function Dynamo() {
  const dynamokey =
    process.env.REACT_APP_USE_DYNAMODB === "true" ? true : false;
  const [refreshKey, setRefreshKey] = useState(0);

  // This function will be passed to the create button
  const handleCreated = () => {
    setRefreshKey((prev) => prev + 1); // changes key to trigger refresh
  };
  return (
    <>
      {dynamokey ? (
        <>
          <Dynamodbcreatebutton onCreated={handleCreated} />
          <Dynamodblist refreshKey={refreshKey} />
        </>
      ) : (
        <p>Run it in local using docker to enable DynamoDB features</p>
      )}
    </>
  );
}

export default Dynamo;
