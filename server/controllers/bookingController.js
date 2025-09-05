import Booking from "../models/Booking.js";
import Car from "../models/car.js";

// Function to Check Availability of Car for a given Date
const checkAvailability = async (carId, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car: carId,
    pickupDate: { $lte: returnDate },   // pickup before return
    returnDate: { $gte: pickupDate }    // return after pickup
  });
  return bookings.length === 0; // true = available
};

// API to Check Availability of Cars for the given Date and Location
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    // 1. Fetch all cars for the given location
    const cars = await Car.find({ location, isAvailable: true });

    // 2. Check availability of each car in parallel
    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
      return { ...car._doc, isAvailable };
    });

    // 3. Resolve all promises
    let availableCars = await Promise.all(availableCarsPromises);

    // 4. Filter only available cars
    availableCars = availableCars.filter(car => car.isAvailable === true);

    // 5. Send response
    res.json({ success: true, availableCars });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// API to Create Booking
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user; // user ID from auth middleware
    const { car, pickupDate, returnDate } = req.body;

    // 1. Check availability
    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Car is not available" });
    }

    // 2. Get car details
    const carData = await Car.findById(car);
    if (!carData) {
      return res.json({ success: false, message: "Car not found" });
    }

    // 3. Calculate number of days between pickup & return
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    const noOfDays = Math.ceil(
      (returned - picked) / (1000 * 60 * 60 * 24) // ms → days
    );

    if (noOfDays <= 0) {
      return res.json({ success: false, message: "Invalid booking dates" });
    }

    // 4. Calculate price
    const price = carData.pricePerDay * noOfDays;

    // 5. Create booking
    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    // 6. Success response
    res.json({ success: true, message: "Booking Created", price, noOfDays });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to Get All Bookings of a User
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user; // user id from auth middleware

    // Fetch bookings for this user and populate car + owner details
    const bookings = await Booking.find({ user: _id })
      .populate("car")   // gets car details
      .populate("owner") // gets owner details
      .sort({ createdAt: -1 }); // latest first

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get Owner Bookings
export const getOwnerBookings = async (req, res) => {
  try {
    // Only owners can access this
    if (req.user.role !== "owner") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Find bookings where logged-in user is the owner
    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car")                 // get car details
      .populate("user", "-password")   // get user details, exclude password
      .sort({ createdAt: -1 });        // latest first

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to Change Booking Status (Owner Only)
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

