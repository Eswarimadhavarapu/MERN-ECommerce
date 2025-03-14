
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()

// Allowed origins (local and production URLs)
const allowedOrigins = [
    'http://localhost:3000', // Local development URL
    process.env.FRONTEND_URL // Production frontend URL (from .env)
  ];
app.use(cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Allow requests from allowed origins
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow credentials (cookies, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE' , 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'] // Allowed headers
  }));

  app.options('*', cors());

//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production (HTTPS)
//     sameSite: 'None', // For cross-origin cookies
// });
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

const PORT = process.env.PORT || 8080


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})
