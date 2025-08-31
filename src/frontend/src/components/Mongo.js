import { useState } from "react";
import Mongocreatebutton from "./Mongocreatebutton";
import Mongodblist from "./Mongodblist";

function Mongo() {
  const [refreshKey, setRefreshKey] = useState(0);

  // This function will be passed to the create button
  const handleCreated = () => {
    setRefreshKey((prev) => prev + 1); // changes key to trigger refresh
  };
  return (
    <div>
      <Mongocreatebutton onCreated={handleCreated}></Mongocreatebutton>
      <Mongodblist refreshKey={refreshKey}></Mongodblist>
    </div>
  );
}

export default Mongo;
