import React, { useState } from "react";

const initialStaff = [
  { id: 1, name: "Amit Kumar", role: "Baker", contact: "9876543210" },
  { id: 2, name: "Priya Sharma", role: "Cashier", contact: "9876543211" },
  { id: 3, name: "Rahul Singh", role: "Helper", contact: "9876543212" },
];

const StaffManagement = () => {
  const [staffList, setStaffList] = useState(initialStaff);
  const [form, setForm] = useState({ name: "", role: "", contact: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.contact) return;
    setStaffList([
      ...staffList,
      { id: Date.now(), ...form }
    ]);
    setForm({ name: "", role: "", contact: "" });
  };

  const handleEdit = (staff) => {
    setEditId(staff.id);
    setForm({ name: staff.name, role: staff.role, contact: staff.contact });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setStaffList(staffList.map(s =>
      s.id === editId ? { ...s, ...form } : s
    ));
    setEditId(null);
    setForm({ name: "", role: "", contact: "" });
  };

  const handleDelete = (id) => {
    setStaffList(staffList.filter(s => s.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({ name: "", role: "", contact: "" });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-pink-700">Staff Management</h2>
      <form
        onSubmit={editId ? handleUpdate : handleAdd}
        className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white font-semibold ${editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}`}
        >
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-400 text-white font-semibold hover:bg-gray-500"
            onClick={() => {
              setEditId(null);
              setForm({ name: "", role: "", contact: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="min-w-full bg-white rounded shadow text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">Role</th>
            <th className="py-2 px-4 border-b text-center">Contact</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id}>
              <td className="py-2 px-4 border-b text-center">{staff.name}</td>
              <td className="py-2 px-4 border-b text-center">{staff.role}</td>
              <td className="py-2 px-4 border-b text-center">{staff.contact}</td>
              <td className="py-2 px-4 border-b flex gap-2 justify-center">
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => handleEdit(staff)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(staff.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-lg text-pink-700 font-semibold text-center">
        Total Staff: {staffList.length}
      </div>
    </div>
  );
};

export default StaffManagement;
