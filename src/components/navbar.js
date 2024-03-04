import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [nama, setNama] = useState(""); // Initialize state with an empty string

  useEffect(() => {
    // Retrieve the value from localStorage and update the state
    const storedNama = localStorage.getItem("nama");
    if (storedNama) {
      setNama(storedNama);
    }
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div className="bg-gray-200 flex justify-between px-2">
      <div>
        <ul>
          <li>Test</li>
        </ul>
      </div>
      <div>{nama}</div>
    </div>
  );
};

export default Dashboard;
