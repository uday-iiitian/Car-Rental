import React, { useEffect, useState } from "react";
import { dummyMyBookingsData, assets } from "../../assets/assets";

const ManageBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData); // corrected
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);


  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-2">Manage Bookings</h2>
      <p className="text-gray-500 mb-6">
        Track all customer bookings, approve or cancel requests, and manage
        booking statuses.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="p-3">Car</th>
              <th className="p-3">Date Range</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                {/* Car Info */}
                <td className="p-3 flex items-center space-x-3">
                  <img
                    src={booking.car.image}
                    alt=""
                    className="w-16 h-12 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{booking.car.brand}{booking.car.model}</p>
                  </div>
                </td>

                {/* Date Range */}
                <td className="p-3 font-sm">
                  {booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}
                </td>

                {/* Total Price */}
                <td className="p-3">
                  {currency}
                  {booking.price}
                </td>

                {/* Actions */}
                <td className="p-3">
                  {booking.status === 'pending' ? (
                    <select className="border rounded-md p-1 text-sm">
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="confirmed">Confirmed</option>
                  </select>
                  ) : (<span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500' }`}>{booking.status}</span>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
