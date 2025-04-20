import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "John Doe", role: "Manager", branch: "Central", access: "Full" },
  { id: 2, name: "Priya Sharma", role: "Staff", branch: "West", access: "Limited" },
  { id: 3, name: "Amit Kumar", role: "Manager", branch: "East", access: "Full" },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleAccessChange = (id, access) => {
    setUsers(users.map(u => u.id === id ? { ...u, access } : u));
  };

  const handleDelete = (id) => setUsers(users.filter(u => u.id !== id));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-pink-700">Manage Users & Access</h2>
      <table className="min-w-full bg-white rounded shadow text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">Role</th>
            <th className="py-2 px-4 border-b text-center">Branch</th>
            <th className="py-2 px-4 border-b text-center">Access</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b text-center">{user.name}</td>
              <td className="py-2 px-4 border-b text-center">{user.role}</td>
              <td className="py-2 px-4 border-b text-center">{user.branch}</td>
              <td className="py-2 px-4 border-b text-center">
                <select
                  value={user.access}
                  onChange={e => handleAccessChange(user.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="Full">Full</option>
                  <option value="Limited">Limited</option>
                  <option value="None">None</option>
                </select>
              </td>
              <td className="py-2 px-4 border-b flex gap-2 justify-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-lg text-pink-700 font-semibold text-center">
        Total Users: {users.length}
      </div>
    </div>
  );
};

export default AdminUsers;
