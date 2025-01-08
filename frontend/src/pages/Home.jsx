import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br min-h-screen from-gray-900 via-gray-800 to-gray-900 text-center">

      <h1 className="text-4xl font-bold mb-6 text-teal-600">
        Wooden Bed Booking System
      </h1>
      <p className="text-lg text-white mb-4">
        Welcome to the Wooden Bed Booking System! Manage and book your beds with
        ease.
      </p>
      <div className="space-x-4 mt-5" >
        <Link
          to="/admin"
          className="px-6 py-3 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          Go to Admin Panel
        </Link>
      </div>
    </div>
  );
};

export default Home;
