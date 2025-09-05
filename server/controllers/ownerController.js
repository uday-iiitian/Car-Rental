import fs from 'fs'
import imagekit from "../configs/imageKit.js";
import User from "../models/User.js";
import Car from "../models/car.js"
import Booking from '../models/Booking.js';

export const changeRoleToOwner = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { role: "owner" });

    res.json({ success: true, message: "Now you can list cars" });
    } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to add car
export const addCar = async (req, res) =>{
  try{
    const {_id} = req.user;
    
    // Validate if file exists
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    // Validate if car data exists
    if (!req.body.carData) {
      return res.status(400).json({ success: false, message: "No car data provided" });
    }

    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;
    
    try {
      //Upload image to imagekit
      const fileBuffer = fs.readFileSync(imageFile.path)
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: '/cars'
      })
      
      // Clean up the temporary file after upload
      fs.unlinkSync(imageFile.path)

      // optimization through imagekit URL transformation 
      var optimizedImageUrl = imagekit.url({
        src: response.url,  // Using response.url instead of response.filePath
        transformation: [
          {width: '1280'},   // width resizing
          {quality: 'auto'},  // Auto compression
          {format: 'webp'}   // Convert to modern format
        ]
      })

      const image = optimizedImageUrl;
      const newCar = await Car.create({...car, owner: _id, image})

      console.log("Car added successfully:", newCar);
      res.status(201).json({
        success: true, 
        message: "Car Added Successfully",
        car: newCar
      })
    } catch (uploadError) {
      // Clean up the temporary file if it exists and upload failed
      if (imageFile && imageFile.path) {
        try {
          fs.unlinkSync(imageFile.path)
        } catch (cleanupError) {
          console.error("Failed to cleanup temporary file:", cleanupError)
        }
      }
      throw uploadError;
    }
  }
  catch(error){
    console.error("Error in addCar:", error);
    res.status(500).json({
      success: false, 
      message: "Failed to add car", 
      error: error.message
    })
  }
}

// api to list all cars of owner
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;

    const cars = await Car.find({owner: _id});
    res.json({success: true, cars});
  } catch (error) {
    console.log(error.message);
    res.json({success: false, error: error.message});
  }
};
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user ;
    const { carId } = req.body ;

    const car = await Car.findById(carId);

    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    } 

    if (!_id || car.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "You are not authorized to change this car's availability",
      });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({ success: true, message: "Car availability toggled successfully", car });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};


// api to delete car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const {carId} = req.body;
    const car = await Car.findById(carId);

    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    } 

    if (!_id || car.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "You are not authorized to change this car's availability",
      });
    }

    car.owner = null; // Remove owner reference
    car.isAvailable = false; // Set availability to false
    await car.save();
    
    res.json({success: true, message: "Car removed successfully"});
  } catch (error) {
    console.log(error.message);
    res.json({success: false, error: error.message});
  }
};

// api to get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const {_id, role} = req.user;
    if(role !== 'owner') {
      return res.json({success: false, message: "Unauthorized access"});
    }

    const cars = await Car.find({owner: _id});
    const bookings = await Booking.find({owner: _id}).populate('car').sort({createdAt: -1});

    const pendingBookings = await Booking.find({owner: _id, status: 'pending'});
    const completedBookings = await Booking.find({owner: _id, status: 'confirmed'});

    // Calculate monthly revenue from confirmed bookings
    const monthlyRevenue = bookings
      .slice() // Create a copy to not modify original array
      .filter(booking => booking.status === 'confirmed')
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 5), // Get latest 5 bookings
      monthlyRevenue
    };
  
    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error.message);
    res.json({success: false, error: error.message});
  }
};

//api to update user image
export const updateUserImage = async (req, res) => {
  try {
      const {_id} = req.user;
      const imageFile = req.file;

      //Upload image to imagekit
      const fileBuffer = fs.readFileSync(imageFile.path)
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: '/users'
      })
      
      // Clean up the temporary file after upload
      fs.unlinkSync(imageFile.path)

      // optimization through imagekit URL transformation 
      var optimizedImageUrl = imagekit.url({
        src: response.url,  // Using response.url instead of response.filePath
        transformation: [
          {width: '400'},   // width resizing
          {quality: 'auto'},  // Auto compression
          {format: 'webp'}   // Convert to modern format
        ]
      })
      const image = optimizedImageUrl;

      await User.findByIdAndUpdate(_id, {image});
      res.json({success: true, message: "Image updated successfully", image});
    }
    catch(error){
      console.log(error.message);
      res.json({success: false, error: error.message});
    }
}