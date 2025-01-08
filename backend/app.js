const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookingsRoute = require('./routes/bookings');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/bookings', bookingsRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Bookings API!');
    });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
