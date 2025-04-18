import React, { useState, useRef, useEffect } from "react";
import CustomerHeader from "../components/customerHeader";

// Dummy data for demonstration
const dummyOrders = [
  { id: 1, date: "2024-06-01", items: ["Chocolate Cake", "Cupcake"], total: 350, status: "Delivered" },
  { id: 2, date: "2024-06-10", items: ["Red Velvet Cake"], total: 500, status: "Processing" },
];

const dummyProfile = {
  name: "John Doe",
  email: "john@example.com",
  mobile: "9876543210",
  loyaltyPoints: 120,
};

const dummyCart = [
  { id: 1, name: "Chocolate Cake", qty: 1, price: 300 },
  { id: 2, name: "Cupcake", qty: 2, price: 50 },
];

const Customer = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [profileTab, setProfileTab] = useState(""); // "" | "profile" | "orders"
  const [profile, setProfile] = useState({ ...dummyProfile });
  const [editProfile, setEditProfile] = useState({ ...dummyProfile });
  const [isEditing, setIsEditing] = useState(false);
  const profileMenuRef = useRef(null);

  // Close the profile menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfile(false);
        setProfileTab("");
      }
    }
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Simulate profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setProfile({ ...editProfile });
    setIsEditing(false);
  };

  // Calculate cart total
  const cartTotal = dummyCart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <CustomerHeader
        onCartClick={() => {
          setShowCart(true);
          setShowProfile(false);
        }}
        onProfileClick={() => {
          setShowProfile((prev) => !prev);
          setShowCart(false);
          setProfileTab("");
        }}
      />
      <main className="flex-1 p-6 relative">
        {/* Profile Dropdown Box in Corner */}
        {showProfile && (
          <div
            ref={profileMenuRef}
            className="absolute right-8 top-6 z-50 bg-white border border-blue-200 rounded-xl shadow-lg w-56"
          >
            <div className="flex flex-col py-2">
              <button
                className={`px-4 py-3 text-left hover:bg-blue-50 transition rounded-t-xl ${
                  profileTab === "profile" ? "bg-blue-100 font-semibold" : ""
                }`}
                onClick={() => { setProfileTab("profile"); setIsEditing(false); }}
              >
                Update Profile
              </button>
              <button
                className={`px-4 py-3 text-left hover:bg-blue-50 transition rounded-b-xl ${
                  profileTab === "orders" ? "bg-blue-100 font-semibold" : ""
                }`}
                onClick={() => { setProfileTab("orders"); setIsEditing(false); }}
              >
                Order History
              </button>
            </div>
          </div>
        )}

        {/* Profile Content */}
        {profileTab === "profile" && showProfile && (
          <div className="bg-blue-50 rounded-xl shadow p-6 mb-6 max-w-md mx-auto mt-16">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            {!isEditing ? (
              <div>
                <div><strong>Name:</strong> {profile.name}</div>
                <div><strong>Email:</strong> {profile.email}</div>
                <div><strong>Mobile:</strong> {profile.mobile}</div>
                <div className="mt-2"><strong>Loyalty Points:</strong> {profile.loyaltyPoints}</div>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editProfile.name}
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editProfile.email}
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={editProfile.mobile}
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    onClick={() => { setIsEditing(false); setEditProfile(profile); }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
        {profileTab === "orders" && showProfile && (
          <div className="bg-blue-50 rounded-xl shadow p-6 mb-6 max-w-2xl mx-auto mt-16">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyOrders.map(order => (
                  <tr key={order.id} className="border-t">
                    <td className="py-2">{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.items.join(", ")}</td>
                    <td>₹{order.total}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Cart Section */}
        {showCart && (
          <div className="bg-pink-50 rounded-xl shadow p-6 mb-6 max-w-md">
            <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
            {dummyCart.length === 0 ? (
              <div className="text-gray-500">Your cart is empty.</div>
            ) : (
              <ul>
                {dummyCart.map(item => (
                  <li key={item.id} className="flex justify-between py-2 border-b">
                    <span>{item.name} x {item.qty}</span>
                    <span>₹{item.qty * item.price}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 font-bold text-right">Total: ₹{cartTotal}</div>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        )}

        {/* Product Browsing & Ordering Section */}
        {!showProfile && !showCart && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-100 rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-2">Browse & Order Products</h2>
              <p>Explore our delicious products and place your order.</p>
              <div className="mt-4 text-gray-500 italic">Product browsing and ordering coming soon...</div>
            </div>
            <div className="bg-green-100 rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-2">Feedback</h2>
              <p>Leave feedback about your experience with us.</p>
              <div className="mt-4 text-gray-500 italic">Feedback form coming soon...</div>
            </div>
            <div className="bg-green-100 rounded-xl shadow p-6 md:col-span-2">
              <h2 className="text-xl font-semibold mb-2">Loyalty Points</h2>
              <p>Earn and track loyalty points with every purchase.</p>
              <div className="mt-2 text-lg font-bold text-green-700">
                Current Points: {profile.loyaltyPoints}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Customer;
