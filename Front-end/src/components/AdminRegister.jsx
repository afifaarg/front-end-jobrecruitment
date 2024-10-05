import React, { useState } from "react";
import axios from "axios";

const RegisterAdmin = ({ onAddMember, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/backendAPI/registerAdmin/",
        formData
      );
      alert("Admin user registered successfully!");

      // Call the parent function to add the new member
      onAddMember({
        ...formData,
        role: "admin",
        uniqueID: response.data.uniqueID,
      });
      onClose(); // Close the modal
      setFormData({
        name: "",
        username: "",
        email: "",
        gender: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to register admin user. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white flex flex-col space-y-2 p-6 w-full max-w-md rounded-2xl">
        <h3 className="text-xl mb-4">Add New Admin</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="font-medium w-full mt-1 p-2 pl-3 rounded-lg border text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="font-medium w-full mt-1 p-2 pl-3 rounded-lg border text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="font-medium w-full mt-1 p-2 pl-3 rounded-lg border text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="font-medium w-full mt-1 p-2 pl-3 rounded-lg border text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="font-medium w-full mt-1 p-2 pl-3 rounded-lg border text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
