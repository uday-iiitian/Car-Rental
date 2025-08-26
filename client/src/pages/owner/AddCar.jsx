import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const AddCar = () => {

  const {axios, currency} = useAppContext();

  const [image, setImage] = useState(null)

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) =>{
  e.preventDefault()
  if(isLoading) return null

  setIsLoading(true)
  try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const {data} = await axios.post('/api/owner/add-car', formData)

      if(data.success){
          toast.success(data.message)
          setImage(null)
          setCar({
            brand: "",
            model: "",
            year: 0,
            pricePerDay: 0,
            category: "",
            transmission: "",
            fuel_type: "",
            seating_capacity: 0,
            location: "",
            description: ""
          })
      }
      else{
          toast.error(data.message)
      }
  } catch (error) {
      toast.error(error.message)   // ✅ FIXED
  } finally {
      setIsLoading(false)
  }
}



  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-2">Add New Car</h2>
      <p className="text-gray-500 mb-6">
        Fill in details to list a new car for booking, including pricing, availability, and car specifications.
      </p>

      <form onSubmit={onSubmitHandler} className="space-y-5">
        {/* Upload */}
        <div className='flex items-center w-full gap-2'>
          <label htmlFor='car-image' className="block text-sm font-medium text-gray-700 mb-1">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer'/>
            <input type="file" id='car-image' accept='image/*' hidden onChange={e=> setImage(e.target.files[0])} />
          </label>
          <p>Upload a picture of a car.</p>
        </div>

        {/* Brand & Model */}
        <div className="grid grid-cols-2 gap-4">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={car.brand}
            onChange={e=>{setCar({...car, brand: e.target.value})}}
            placeholder="e.g. BMW, Mercedes, Audi..."
            className="border p-2 rounded-md w-full"
          />
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={car.model}
            onChange={e=>setCar({...car, model: e.target.value})}
            placeholder="e.g. X5, E-Class, M4..."
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Year, Price, Category */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label>Year</label>
            <input
              type="number"
              name="year"
              value={car.year}
              onChange={e=>setCar({...car, year: e.target.value})}
              placeholder="Year"
              className="border p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label>Price in {currency}</label>
            <input
              type="number"
              name="price"
              value={car.pricePerDay}
              onChange={e=>setCar({...car, pricePerDay: e.target.value})}
              placeholder="Daily Price ($)"
              className="border p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label >Category</label>
            <select
              name="category"
              value={car.category}
              onChange={e=>setCar({...car, category: e.target.value})}
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select a category</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
        </div>

        {/* Transmission, Fuel, Seating */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label >Transmission</label>
            <select
            name="transmission"
            value={car.transmission}
            onChange={e=>setCar({...car, transmission: e.target.value})}
            className="border p-2 rounded-md w-full"
            >
            <option value="">Select transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label >Fuel Type</label>
            <select
            name="fuelType"
            value={car.fuel_type}
            onChange={e=>setCar({...car, fuel_type: e.target.value})}
            className="border p-2 rounded-md w-full"
          >
            <option value="">Select fuel type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          </div>
          <div>
            <label >Seating Capacity</label>
            <input
            type="number"
            name="seating"
            value={car.seating_capacity}
            onChange={e=>setCar({...car, seating_capacity: e.target.value})}
            placeholder="Seating Capacity"
            className="border p-2 rounded-md w-full"
          />
          </div>

        </div>

        {/* Location */}
        <div>
          <label >Location</label>
          <select
            name="location"
            value={car.location}
            onChange={e=>setCar({...car, location: e.target.value})}
            className="border p-2 rounded-md w-full"
          >
            <option value="">Select a location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Houston">Houston</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label >Description of a car</label>
          <textarea
            name="description"
            value={car.description}
            onChange={e=>setCar({...car, description: e.target.value})}
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
            className="border p-2 rounded-md w-full h-24"
          ></textarea>
        </div >

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 flex"
        >
          <img src={assets.tick_icon} alt="" className='pr-2'/>
         {isLoading?'Listing...':'List Your Car'}
        </button>
      </form>
    </div>
  );
}

export default AddCar
