const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create a new booking
router.post('/', async (req, res) => {
 
    try {
      const { customer_id, customer_name, cell, day, time, bed_detail, total_amount, delivery_address } = req.body;
  
      // Validate incoming data
      if (!customer_id || !customer_name || !cell || !bed_detail || !total_amount || !delivery_address) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      // Insert into database
      const [result] = await db.query(
        `INSERT INTO bookings (customer_id, customer_name, cell, day, time, bed_detail, total_amount, delivery_address)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [customer_id, customer_name, cell, day, time, bed_detail, total_amount, delivery_address]
      );
  
      res.status(201).json({ message: 'Booking created successfully!', bookingId: result.insertId });
    } catch (error) {
      console.error('Error adding booking:', error.message);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });

// Update a booking
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { customer_name, customer_id, cell, day, time, bed_detail, total_amount, delivery_address } = req.body;
  try {
    await db.query('UPDATE bookings SET customer_name = ?, customer_id = ?, cell = ?, day = ?, time = ?, bed_detail = ?, total_amount = ?, delivery_address = ? WHERE id = ?', 
      [customer_name, customer_id, cell, day, time, bed_detail, total_amount, delivery_address, id]);
    res.send('Booking updated');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
  try {
    await db.query('DELETE FROM bookings WHERE id = ?', [id]);
    res.send('Booking deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
