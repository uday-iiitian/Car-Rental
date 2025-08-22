import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
    checkAvailabilityOfCar,
    createBooking, 
    getUserBookings,
    getOwnerBookings,
    changeBookingStatus
} from '../controllers/bookingController.js';

const bookingRouter = express.Router();

// Route to check car availability
bookingRouter.post("/check-availability", checkAvailabilityOfCar);

// Protected routes (require authentication)
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.post("/change-status", protect, changeBookingStatus);

export default bookingRouter;
