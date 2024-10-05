import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import ProfileComponent from "./pages/Landingpage";
import { Privateroute } from "./components/Privateroute";
import AdminDashboard from "./pages/adminDashboard";
import comingSoon from "./pages/Comingsoon";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<Signup />} />
          {/* Protected route */}
          <Route
            path="/Landed"
            element={<Privateroute element={comingSoon} />}
          />
          <Route
            path="/Profile"
            element={<Privateroute element={ProfileComponent} />}
          />
          <Route
            path="/adminDashboard"
            element={<Privateroute element={AdminDashboard} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
