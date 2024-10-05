import React from "react";

const UserList = ({ users }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-primary-dark">User List</h2>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-left text-secondary-muted">Name</th>
            <th className="py-2 text-left text-secondary-muted">Gender</th>
            <th className="py-2 text-left text-secondary-muted">Joined Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-secondary-muted">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.gender}</td>
              <td className="py-2">{user.joinedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
