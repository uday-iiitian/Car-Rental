import React, { use, useEffect, useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";
import Title from "../../components/Title";
import { set } from "mongoose";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ManageCars = () => {
  const {currency, isOwner, axios} = useAppContext();

  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
      try {
        const {data} = await axios.get('/api/owner/cars');
        if(data.success){
          setCars(data.cars);
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
  }
  const toggleAvailability = async (carId) => {
      try {
        const {data} = await axios.post('/api/owner/toggle-car', {carId});
        if(data.success){
          toast.success(data.message);
          fetchOwnerCars();
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
  }
  const deleteCar = async (carId) => {
      try {
        const {data} = await axios.post('/api/owner/delete-car', {carId});
        if(data.success){
          toast.success(data.message);
          fetchOwnerCars();
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if(isOwner) fetchOwnerCars()
  },[isOwner])

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-2xl">

      <h2 className="text-2xl font-bold mb-2">Manage Cars</h2>
      <p className="text-gray-500 mb-6">
        View all listed cars, update their details, or remove them from the booking platform.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="p-3">Car</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={car._id} className="border-b hover:bg-gray-50">
                {/* Car Info */}
                <td className="p-3 flex items-center space-x-3">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-16 h-12 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{car.brand} {car.model}</p>
                    <p className="text-sm text-gray-500">
                      {car.seating_capacity} seats • {car.transmission}
                    </p>
                  </div>
                </td>

                {/* Category */}
                <td className="p-3">{car.category}</td>

                {/* Price */}
                <td className="p-3">{currency}{car.pricePerDay}/day</td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      car.isAvailable ?
                         "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {car.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 flex items-center space-x-3">

                  <img onClick={()=>toggleAvailability(car._id)} src={car.isAvailble ? assets.eye_close_icon : assets.eye_icon} alt="" className="cursor-pointer"/>

                  <img onClick={()=>deleteCar(car._id)} src={assets.delete_icon} alt="" className="cursor-pointer"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
