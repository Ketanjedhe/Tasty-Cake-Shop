import React, { useState } from "react";

const initialBranches = [
  { id: 1, name: "Central", location: "Delhi" },
  { id: 2, name: "West", location: "Mumbai" },
  { id: 3, name: "East", location: "Kolkata" },
];

const AdminBranches = () => {
  const [branches, setBranches] = useState(initialBranches);
  const [form, setForm] = useState({ name: "", location: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.location) return;
    setBranches([...branches, { id: Date.now(), ...form }]);
    setForm({ name: "", location: "" });
  };

  const handleDelete = (id) => setBranches(branches.filter(b => b.id !== id));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-pink-700">Manage Branches</h2>
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
        <input
          type="text"
          name="name"
          placeholder="Branch Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <button type="submit" className="px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600">
          Add
        </button>
      </form>
      <table className="min-w-full bg-white rounded shadow text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Branch Name</th>
            <th className="py-2 px-4 border-b text-center">Location</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.id}>
              <td className="py-2 px-4 border-b text-center">{branch.name}</td>
              <td className="py-2 px-4 border-b text-center">{branch.location}</td>
              <td className="py-2 px-4 border-b flex gap-2 justify-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(branch.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-lg text-pink-700 font-semibold text-center">
        Total Branches: {branches.length}
      </div>
    </div>
  );
};

export default AdminBranches;
