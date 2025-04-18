import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/signup", formData);
      toast.success(res.data.message || "Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-[#dfa674] shadow-lg rounded-2xl flex flex-col w-96 p-6">
        <h2 className="font-bold text-3xl text-[#002D74] text-center">Sign Up</h2>
        <p className="text-sm mt-2 text-[#002D74] text-center">Create a new account</p>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <select
            className="p-2 rounded-xl border"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="admin">Admin</option>
            <option value="branchmanager">Branch Manager</option>
            <option value="customer">Customer</option>
          </select>
          <input className="p-2 rounded-xl border" type="text" name="firstname" placeholder="First Name" required value={formData.firstname} onChange={handleChange} />
          <input className="p-2 rounded-xl border" type="text" name="lastname" placeholder="Last Name" required value={formData.lastname} onChange={handleChange} />
          <input className="p-2 rounded-xl border" type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          <input className="p-2 rounded-xl border" type="tel" name="mobile" placeholder="Mobile Number" pattern="[0-9]{10}" required value={formData.mobile} onChange={handleChange} />
          <input className="p-2 rounded-xl border w-full" type="password" name="password" placeholder="Password (Min 6 chars)" minLength="6" required value={formData.password} onChange={handleChange} />
          <button className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300">Sign Up</button>
        </form>
        <div className="mt-4 text-sm flex justify-between items-center">
          <p>Already have an account?</p>
          <button onClick={() => navigate("/login")} className="text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 duration-300">Login</button>
        </div>
      </div>
    </section>
  );
};

export default Signup;
