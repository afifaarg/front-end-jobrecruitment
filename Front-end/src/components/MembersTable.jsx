import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import RegisterAdmin from "./AdminRegister";
import ProfileComponent from "../pages/Landingpage"; // Import your ProfileComponent

const TABS = [
  { label: "All", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Employee", value: "employee" },
];

const TABLE_HEAD = [
  "Username",
  "Name",
  "Role",
  "Country",
  "Gender",
  "Joined Date",
  "Experience",
  "Unique ID",
  "Profile", // Add a new header for the Profile button
];

export default function MembersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [newMember, setNewMember] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    role: "admin", // Default role
    gender: "",
  });

  const [members, setMembers] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("allUsers")) || [];
    setMembers(storedMembers);
  }, []);

  const handleOpen = () => setOpen(!open);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleAddMember = () => {
    const updatedMembers = [...members, { ...newMember }];
    setMembers(updatedMembers);
    localStorage.setItem("allUsers", JSON.stringify(updatedMembers));
    setNewMember({
      username: "",
      password: "",
      name: "",
      email: "",
      role: "admin",
      gender: "",
    });
    handleOpen(); // Close the modal
  };

  const filteredRows = members.filter((row) => {
    const matchesSearch = row.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = activeTab === "all" || row.role === activeTab;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const displayedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleViewProfile = (userId) => {
    localStorage.setItem("userID", userId);
    navigate("/Profile"); // Use navigate to change the route
  };

  return (
    <div className="w-full h-full bg-white shadow-lg rounded-lg">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Members list
            </h1>
            <p className="text-sm text-gray-600">
              See information about all members
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleOpen}
          >
            + New Admin
          </button>
        </div>
        {open && (
          <RegisterAdmin onAddMember={handleAddMember} onClose={handleOpen} />
        )}
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex gap-2">
            {TABS.map(({ label, value }) => (
              <button
                key={value}
                className={`py-2 px-4 rounded-lg ${
                  activeTab === value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => {
                  setActiveTab(value);
                  setCurrentPage(1);
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            className="border border-gray-300 rounded-lg p-2 w-full sm:w-72"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedRows.map((row) => (
              <tr key={row.username}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.country}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.birth_Date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.experienceYears} years
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.uniqueID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    className="text-blue-500 bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-2 "
                    onClick={() => handleViewProfile(row.id)} // Call the view profile function with uniqueID
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1.5em"
                      width="1.5em"
                    >
                      <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-4">
        <button
          className={`py-2 px-4 rounded-lg ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`py-2 px-4 rounded-lg ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
