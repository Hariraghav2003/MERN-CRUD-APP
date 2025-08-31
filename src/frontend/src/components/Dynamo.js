import { useState } from "react";
import Dynamodbcreatebutton from "./Dynamodbcreatebutton";
import Dynamodblist from "./Dynamodblist";

function Dynamo() {
  const [refreshKey, setRefreshKey] = useState(0);

  // This function will be passed to the create button
  const handleCreated = () => {
    setRefreshKey((prev) => prev + 1); // changes key to trigger refresh
  };
  return (
    <>
      <Dynamodbcreatebutton onCreated={handleCreated}></Dynamodbcreatebutton>
      <Dynamodblist refreshKey={refreshKey}></Dynamodblist>
    </>
  );
}

export default Dynamo;
