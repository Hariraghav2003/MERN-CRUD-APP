import { useState } from "react";
import Sqlcreatebutton from "./Sqlcreatebutton";
import Sqldblist from "./Sqldblist";

function Sql() {
  const [refreshKey, setRefreshKey] = useState(0);

  // This function will be passed to the create button
  const handleCreated = () => {
    setRefreshKey((prev) => prev + 1); // changes key to trigger refresh
  };
  return (
    <div>
      <Sqlcreatebutton onCreated={handleCreated} />
      <Sqldblist refreshKey={refreshKey} />
    </div>
  );
}

export default Sql;
