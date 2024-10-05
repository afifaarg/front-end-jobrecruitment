import React, { useState } from "react";
import UserForm from "../components/UserForm";
import Statistics from "../components/UserStats";
import MembersTable from "../components/MembersTable";
import NavBar from "../components/Navbar";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("users"); // Manage active section
  const [users, setUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar visibility

  // Add a new user to the list
  const addUser = (user) => {
    setUsers([...users, user]);
  };

  // Toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Sidebar */}
      <aside
        className={`py-8 w-64 z-10 bg-primary-dark text-white flex flex-col p-4 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

        <nav className="flex flex-col space-y-4 mt-4">
          <button
            className={`py-2 px-4 text-left rounded-lg hover:bg-primary-light ${
              selectedSection === "users" ? "bg-primary-light" : ""
            }`}
            onClick={() => setSelectedSection("users")}
          >
            User List
          </button>
          <button
            className={`py-2 px-4 text-left rounded-lg hover:bg-primary-light ${
              selectedSection === "stats" ? "bg-primary-light" : ""
            }`}
            onClick={() => setSelectedSection("stats")}
          >
            User Statistics
          </button>
        </nav>
      </aside>

      <main className="sm:flex-1 bg-secondary-light">
        <NavBar />
        <div className="p-6">
          {selectedSection === "users" && <MembersTable />}
          {selectedSection === "stats" && <Statistics />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
