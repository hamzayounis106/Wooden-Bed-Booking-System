import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Calendar,
  Clock,
  DollarSign,
  Home,
  Phone,
  User,
  Package,
  UserCircle,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

const AdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: "",
    customer_name: "",
    cell: "",
    day: "",
    time: "",
    bed_detail: "",
    total_amount: "",
    delivery_address: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);
  const filteredBookings = bookings.filter((booking) =>
    booking.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error(
        "Error fetching bookings:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch bookings!", { theme: "dark" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Check if all fields are filled
    for (const field in formData) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field.replace("_", " ")}`, {
          theme: "dark",
        });
        return false;
      }
    }

    // Validate booking date is not in the past
    const selectedDate = new Date(formData.day + "T" + formData.time);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      toast.error("Cannot book for past dates!", { theme: "dark" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        const response = await axios.put(
          `http://localhost:5000/api/bookings/${editingId}`,
          formData
        );
        toast.success(
          response.data.message || "Booking updated successfully!",
          { theme: "dark" }
        );
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/bookings",
          formData
        );
        toast.success(response.data.message || "Booking added successfully!", {
          theme: "dark",
        });
      }

      resetForm();
      fetchBookings();
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to save booking.", {
        theme: "dark",
      });
    }
  };

  const handleEdit = (booking) => {
    setFormData(booking);
    setEditingId(booking.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/bookings/${id}`
      );
      toast.success(response.data?.message || "Booking deleted successfully!", {
        theme: "dark",
      });
      fetchBookings();
    } catch (error) {
      console.error(
        "Error deleting booking:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Failed to delete booking.",
        { theme: "dark" }
      );
    }
  };

  const resetForm = () => {
    setFormData({
      customer_id: "",
      customer_name: "",
      cell: "",
      day: "",
      time: "",
      bed_detail: "",
      total_amount: "",
      delivery_address: "",
    });
    setEditingId(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date("1970-01-01T" + timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get current date in YYYY-MM-DD format for date input min attribute
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-teal-400">
          Booking Management System
        </h1>

        {/* Form Section */}
        <div className="mb-12 w-full mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-6 text-teal-400 flex items-center gap-2">
              {editingId ? (
                <Calendar className="h-6 w-6" />
              ) : (
                <Package className="h-6 w-6" />
              )}
              {editingId ? "Update Booking" : "New Booking"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <UserCircle className="h-4 w-4" />
                  Customer ID
                </label>
                <input
                  type="text"
                  name="customer_id"
                  value={formData.customer_id}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                  placeholder="Enter customer ID"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <User className="h-4 w-4" />
                  Customer Name
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                  placeholder="Enter customer name"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Phone className="h-4 w-4" />
                  Cell Number
                </label>
                <input
                  type="text"
                  name="cell"
                  value={formData.cell}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                  placeholder="Enter cell number"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Calendar className="h-4 w-4" />
                  Date
                </label>
                <input
                  type="date"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  min={getCurrentDate()}
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Clock className="h-4 w-4" />
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Package className="h-4 w-4" />
                  Bed Details
                </label>
                <input
                  type="text"
                  name="bed_detail"
                  value={formData.bed_detail}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                  placeholder="Enter bed details"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <DollarSign className="h-4 w-4" />
                  Total Amount
                </label>
                <input
                  type="number"
                  name="total_amount"
                  value={formData.total_amount}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                  placeholder="Enter total amount"
                />
              </div>

              <div className="space-y-2 ">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Home className="h-4 w-4" />
                  Delivery Address
                </label>
                <input
                  type="text"
                  name="delivery_address"
                  value={formData.delivery_address}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                  placeholder="Enter delivery address"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-4 justify-end items-end">
              <button
                type="submit"
                className=" bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-md transition duration-200 flex items-center justify-center gap-2"
              >
                {editingId ? "Update Booking" : "Add Booking"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-md transition duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Bookings List */}
        <div className="mb-6">
          <div>
            <div className="flex justify-start items-center mb-6">
              <h2 className="text-3xl font-bold  text-teal-400 flex items-center gap-2">
                {" "}
                <Search className="h-6 w-6" /> Search{" "}
              </h2>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search bookings by customer name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-teal-400 mb-6 flex items-center gap-2">
          <Package className="h-6 w-6" />   All Bookings
          </h2>

          {/* Table for larger screens */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-4 text-left">Customer ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Cell</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Time</th>
                  <th className="p-4 text-left">Bed Details</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Address</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-gray-700 hover:bg-gray-700/50"
                  >
                    <td className="p-4">{booking.customer_id}</td>
                    <td className="p-4">{booking.customer_name}</td>
                    <td className="p-4">{booking.cell}</td>
                    <td className="p-4">{formatDate(booking.day)}</td>
                    <td className="p-4">{formatTime(booking.time)}</td>
                    <td className="p-4">{booking.bed_detail}</td>
                    <td className="p-4">${booking.total_amount}</td>
                    <td className="p-4">{booking.delivery_address}</td>
                    <td className="p-4">
                      <div className="flex gap-6 ">
                        <Pencil
                          onClick={() => handleEdit(booking)}
                          className="h-4 w-4 cursor-pointer"
                        />
                        <Trash2
                          onClick={() => handleDelete(booking.id)}
                          className="h-4 w-4 text-red-600 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for smaller screens */}
          <div className="lg:hidden grid gap-6 sm:grid-cols-2">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gray-800 rounded-lg p-6 space-y-4 border border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-teal-400">
                      {booking.customer_name}
                    </h3>
                    <p className="text-gray-400">ID: {booking.customer_id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-teal-400">
                      ${booking.total_amount}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {booking.cell}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {formatDate(booking.day)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {formatTime(booking.time)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    {booking.bed_detail}
                  </p>
                  <p className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-gray-400" />
                    {booking.delivery_address}
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-700">
                  <Pencil
                    onClick={() => handleEdit(booking)}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <Trash2
                    onClick={() => handleDelete(booking.id)}
                    className="h-4 w-4 text-red-600 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
