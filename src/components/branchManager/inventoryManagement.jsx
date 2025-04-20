import React, { useState } from "react";

const initialInventory = [
  { id: 1, name: "Flour", quantity: 50, unit: "kg" },
  { id: 2, name: "Sugar", quantity: 30, unit: "kg" },
  { id: 3, name: "Eggs", quantity: 200, unit: "pcs" },
  { id: 4, name: "Butter", quantity: 10, unit: "kg" },
];

const InventoryManagement = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [form, setForm] = useState({ name: "", quantity: "", unit: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.unit) return;
    setInventory([
      ...inventory,
      { id: Date.now(), name: form.name, quantity: Number(form.quantity), unit: form.unit }
    ]);
    setForm({ name: "", quantity: "", unit: "" });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, quantity: item.quantity, unit: item.unit });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setInventory(inventory.map(item =>
      item.id === editId ? { ...item, ...form, quantity: Number(form.quantity) } : item
    ));
    setEditId(null);
    setForm({ name: "", quantity: "", unit: "" });
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({ name: "", quantity: "", unit: "" });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-pink-700">Inventory Management</h2>
      <form
        onSubmit={editId ? handleUpdate : handleAdd}
        className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center"
      >
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          min="0"
          required
        />
        <input
          type="text"
          name="unit"
          placeholder="Unit"
          value={form.unit}
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
              setForm({ name: "", quantity: "", unit: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="min-w-full bg-white rounded shadow text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Item</th>
            <th className="py-2 px-4 border-b text-center">Quantity</th>
            <th className="py-2 px-4 border-b text-center">Unit</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b text-center">{item.name}</td>
              <td className="py-2 px-4 border-b text-center">{item.quantity}</td>
              <td className="py-2 px-4 border-b text-center">{item.unit}</td>
              <td className="py-2 px-4 border-b flex gap-2 justify-center">
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-lg text-pink-700 font-semibold text-center">
        Total Inventory Items: {inventory.length}
      </div>
    </div>
  );
};

export default InventoryManagement;
