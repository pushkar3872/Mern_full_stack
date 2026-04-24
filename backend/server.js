require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user.route');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('User Management API is running...');
});

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect DB and start server
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');

        // 🔥 IMPORTANT CHANGE HERE
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
    });