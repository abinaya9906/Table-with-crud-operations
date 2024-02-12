import React from "react";
import Table from "../Table/Table";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="p-2 d-flex justify-content-between">
        <div>
          <h5 className="ml-auto mt-2">Dashboard</h5>
        </div>
        <div>
          <button className="btn btn-danger shadow" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default Dashboard;
