# Car Rental Application

A full-stack car rental application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚗 Features

- User Authentication & Authorization
- Car Listing and Details
- Booking Management
- Owner Dashboard
- Responsive Design
- Real-time Updates
- Secure Payment Integration

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router v6
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- ImageKit Integration

## 📁 Project Structure

```
car-rental/
├── client/          # Frontend React application
├── server/          # Backend Node.js server
└── README.md        # Main documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/car-rental.git
cd car-rental
```

2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:
- Create `.env` in server directory
- Create `.env` in client directory

4. Start the application:
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

## 🌟 Key Features

### User Features
- Browse available cars
- View detailed car information
- Make bookings
- Manage bookings
- User profile management

### Owner Features
- Dashboard analytics
- Car management
- Booking management
- User management

## 📝 Environment Variables

### Client (.env)
```
VITE_API_BASE_URL=http://localhost:5000
VITE_CURRENCY=$
```

### Server (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- [Your Name](https://github.com/yourusername)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.