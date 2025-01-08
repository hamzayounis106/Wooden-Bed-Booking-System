-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2025 at 12:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wooden_beds`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_id` varchar(50) NOT NULL,
  `cell` varchar(20) DEFAULT NULL,
  `day` date NOT NULL,
  `time` time NOT NULL,
  `bed_detail` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `delivery_address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `customer_name`, `customer_id`, `cell`, `day`, `time`, `bed_detail`, `total_amount`, `delivery_address`) VALUES
(1, 'Ali Khan', 'CUST001', '03001234567', '2025-01-10', '10:30:00', 'Single Bed', 4000.00, 'House #12, G-11/3, Islamabad'),
(2, 'Fatima Iqbal', 'CUST002', '03112345678', '2025-01-11', '11:00:00', 'Double Bed', 6000.00, 'Apartment #5, DHA Phase 5, Karachi'),
(3, 'Ahmed Raza', 'CUST003', '03451234567', '2025-01-12', '09:00:00', 'King Bed', 10000.00, 'Plot #23, Model Town, Lahore'),
(4, 'Ayesha Noor', 'CUST004', '03211234567', '2025-01-13', '14:15:00', 'Queen Bed', 8500.00, 'Flat #7, Bahria Town, Islamabad'),
(5, 'Hassan Malik', 'CUST005', '03031234567', '2025-01-14', '16:00:00', 'Twin Bed', 5000.00, 'Street #8, Gulshan-e-Iqbal, Karachi'),
(6, 'Maria Tariq', 'CUST006', '03151234567', '2025-01-15', '12:30:00', 'Double Bed', 7000.00, 'House #45, Allama Iqbal Town, Lahore'),
(7, 'Usman Ali', 'CUST007', '03321234567', '2025-01-16', '18:45:00', 'Single Bed', 3500.00, 'Sector F, Hayatabad, Peshawar'),
(8, 'Zara Shah', 'CUST008', '03461234567', '2025-01-17', '08:00:00', 'King Bed', 12000.00, 'House #78, Satellite Town, Rawalpindi'),
(9, 'Hamza Farooq', 'CUST009', '03231234567', '2025-01-18', '15:00:00', 'Twin Bed', 4500.00, 'Street #9, Faisal Town, Lahore'),
(10, 'Sara Zafar', 'CUST010', '03021234567', '2025-01-19', '13:30:00', 'Queen Bed', 8000.00, 'Block C, North Nazimabad, Karachi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
