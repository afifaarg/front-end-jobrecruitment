import React from "react";
import { Navigate } from "react-router-dom";

export function Privateroute({ element: Component, ...rest }) {
  const isAuthenticated = Boolean(localStorage.getItem("access")); // Check for access token in localStorage

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied</h2>
        <p>You need to be logged in to view this page.</p>
        <button
          onClick={() => window.history.back()}
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          Go Back
        </button>
      </div>
    ); // Show message and button if not authenticated
  }

  return <Component {...rest} />; // Render the component if authenticated
}
