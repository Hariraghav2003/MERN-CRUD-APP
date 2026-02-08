import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import Dynamodbcreatebutton from "./Dynamodbcreatebutton";
import Dynamodblist from "./Dynamodblist";

function Dynamo() {
  const dynamokey =
    process.env.REACT_APP_USE_DYNAMODB === "false" ? true : false;
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
        <>
          Run it in local using docker to enable DynamoDB features <t/>
          <a
            href="https://github.com/Hariraghav2003/MERN-CRUD-APP.git"
            target="_blank"
            rel="noreferrer"
            className="text-dark fs-5"
          >
            <FaGithub />
          </a>
        </>
      )}
    </>
  );
}

export default Dynamo;
