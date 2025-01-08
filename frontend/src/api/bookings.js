import axios from 'axios';

const API_URL = 'http://localhost:5000/api/bookings';

export const getBookings = async () => axios.get(API_URL);
export const createBooking = async (booking) => axios.post(API_URL, booking);
export const updateBooking = async (id, booking) => axios.put(`${API_URL}/${id}`, booking);
export const deleteBooking = async (id) => axios.delete(`${API_URL}/${id}`);
