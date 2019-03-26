import React, { useState, useEffect } from "react";
import axios from "axios";

function GettingValues() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://localhost:44332/api/values/");

      setValues(result.data);
      console.log(values);
    };
    fetchData();
  }, []);

  return (
    <div>
      {values.map(value => {
        return <h1>{value.name}</h1>;
      })}
    </div>
  );
}

export default GettingValues;
