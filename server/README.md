# Car Rental Backend

Node.js/Express backend for the Car Rental application.

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- ImageKit for image storage
- Express middleware for security

## 📁 Project Structure

```
server/
├── configs/        # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
└── server.js       # Server entry point
```

## 🔧 Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## 📝 Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

## 🔐 API Routes

### Authentication Routes
```
POST /api/users/register
POST /api/users/login
GET  /api/users/me
```

### Car Routes
```
GET    /api/cars
GET    /api/cars/:id
POST   /api/owner/cars
PUT    /api/owner/cars/:id
DELETE /api/owner/cars/:id
```

### Booking Routes
```
POST   /api/booking
GET    /api/booking/user
GET    /api/owner/bookings
PUT    /api/owner/bookings/:id
```

## 📚 Models

### User Model
- Email
- Password (hashed)
- Role (user/owner)
- Profile information

### Car Model
- Brand
- Model
- Year
- Category
- Price
- Location
- Images
- Features

### Booking Model
- Car reference
- User reference
- Dates
- Status
- Payment information

## 🔒 Security

- Password hashing
- JWT authentication
- Request validation
- Error handling
- Security headers