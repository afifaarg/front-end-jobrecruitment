import React, { useState } from "react";

const UserForm = ({ addUser }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [joinedDate, setJoinedDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { id: Date.now(), name, gender, joinedDate };
    addUser(newUser);
    setName("");
    setGender("Male");
    setJoinedDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-primary-dark">
        Create New User
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-secondary-text">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-secondary-muted rounded-md focus:border-primary-light"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-secondary-text">
          Gender
        </label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mt-1 block w-full p-2 border border-secondary-muted rounded-md focus:border-primary-light"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-secondary-text">
          Joined Date
        </label>
        <input
          type="date"
          value={joinedDate}
          onChange={(e) => setJoinedDate(e.target.value)}
          className="mt-1 block w-full p-2 border border-secondary-muted rounded-md focus:border-primary-light"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-dark text-white p-2 rounded-md"
      >
        Add User
      </button>
    </form>
  );
};

export default UserForm;
