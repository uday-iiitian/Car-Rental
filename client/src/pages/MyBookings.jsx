import React, { useEffect, useState } from 'react'
import { assets, dummyMyBookingsData } from '../assets/assets'
import Title from '../components/Title'

const MyBookings = () => {
  const [booking, setBooking] = useState([])
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchMyBookings = async () => {
    setBooking(dummyMyBookingsData)
  }

  useEffect(() => {
    fetchMyBookings()
  }, [])

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>

      <Title
        title='My Bookings'
        subTitle='View and manage all your car bookings'
        align='left'
      />

      <div>
        {booking.map((booking, index) => (
          <div
            key={booking._id}
            className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12 bg-white shadow-sm'
          >
            {/* Left: Car image and details */}
            <div className='md:col-span-1'>
              <div className='rounded-md mb-3 overflow-hidden'>
                <img
                  src={booking.car.image}
                  alt={booking.car.model}
                  className='w-full h-auto object-cover aspect-video'
                />
              </div>
              <p className='text-lg font-medium mt-2'>
                {booking.car.brand} {booking.car.model}
              </p>
              <p className='text-gray-500'>
                {booking.car.year} • {booking.car.category} • {booking.car.location}
              </p>
            </div>

            {/* Middle: Booking details */}
            <div className='md:col-span-2 flex flex-col justify-between'>
              <div>
                <div className='flex items-center gap-2 flex-wrap'>
                  <p className='px-3 py-1.5 bg-light rounded font-medium'>
                    Booking #{index + 1}
                  </p>
                  <p
                    className={`px-3 py-1 text-xs rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-green-400/15 text-green-600'
                        : 'bg-red-400/15 text-red-600'
                    }`}
                  >
                    {booking.status}
                  </p>
                </div>

                <div className='flex items-start gap-2 mt-4'>
                  <img
                    src={assets.calendar_icon_colored}
                    alt=""
                    className='w-4 h-4 mt-1'
                  />
                  <div>
                    <p className='text-gray-500 text-xs'>Rental Period</p>
                    <p className='font-medium'>
                      {booking.pickupDate.split('T')[0]} - {booking.returnDate.split('T')[0]}
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-2 mt-3'>
                  <img
                    src={assets.location_icon}
                    alt=""
                    className='w-4 h-4 mt-1'
                  />
                  <div>
                    <p className='text-gray-500 text-xs'>Pick-up Location</p>
                    <p className='font-medium'>{booking.car.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Price */}
            <div className='md:col-span-1 flex flex-col items-end justify-between text-right'>
              <div>
                <p className='text-gray-500 text-sm'>Total Price</p>
                <h1 className='text-2xl font-semibold text-blue-500'>
                  {currency}{booking.price}
                </h1>
                <p className='text-xs text-gray-400 mt-1'>
                  Booked on {booking.createdAt.split('T')[0]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings
