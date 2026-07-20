const express = require('express');
const path = require('path');
const searchRoutes = require('./routes/searchRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root workspace directory
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Mount API routes
app.use('/api/search', searchRoutes);


// ==========================================================================
// 1. GET /stations - Autocomplete stations/airports
// ==========================================================================
app.get('/stations', (req, res) => {
    const stations = [
        { id: 1, name: 'London Heathrow Airport', code: 'LHR', city: 'London', country: 'United Kingdom', type: 'Flight' },
        { id: 2, name: 'Paris Charles de Gaulle', code: 'CDG', city: 'Paris', country: 'France', type: 'Flight' },
        { id: 3, name: 'New York John F. Kennedy', code: 'JFK', city: 'New York', country: 'United States', type: 'Flight' },
        { id: 4, name: 'Tokyo Haneda Airport', code: 'HND', city: 'Tokyo', country: 'Japan', type: 'Flight' },
        { id: 5, name: 'New Delhi Indira Gandhi International', code: 'DEL', city: 'New Delhi', country: 'India', type: 'Flight' },
        { id: 6, name: 'Mumbai Chhatrapati Shivaji', code: 'BOM', city: 'Mumbai', country: 'India', type: 'Flight' },
        { id: 7, name: 'Singapore Changi Airport', code: 'SIN', city: 'Singapore', country: 'Singapore', type: 'Flight' },
        
        { id: 8, name: 'London St Pancras International', code: 'QQS', city: 'London', country: 'United Kingdom', type: 'Train' },
        { id: 9, name: 'Paris Gare du Nord', code: 'XPG', city: 'Paris', country: 'France', type: 'Train' },
        { id: 10, name: 'New York Penn Station', code: 'NYP', city: 'New York', country: 'United States', type: 'Train' },
        { id: 11, name: 'New Delhi Railway Station', code: 'NDLS', city: 'New Delhi', country: 'India', type: 'Train' },

        { id: 12, name: 'Victoria Coach Station', code: 'VCS', city: 'London', country: 'United Kingdom', type: 'Bus' },
        { id: 13, name: 'Paris Gallieni Bus Station', code: 'PGB', city: 'Paris', country: 'France', type: 'Bus' },
        { id: 14, name: 'Kashmere Gate ISBT', code: 'KGIB', city: 'New Delhi', country: 'India', type: 'Bus' }
    ];
    res.json(stations);
});

// ==========================================================================
// 2. GET /routes - Trending travel routes
// ==========================================================================
app.get('/routes', (req, res) => {
    const routes = [
        { id: 101, from: 'London (LHR)', to: 'Paris (CDG)', type: 'Flight', duration: '1h 15m', price: 65, active: true },
        { id: 102, from: 'New Delhi (DEL)', to: 'Mumbai (BOM)', type: 'Flight', duration: '2h 10m', price: 79, active: true },
        { id: 103, from: 'London St Pancras', to: 'Paris Gare du Nord', type: 'Train', duration: '2h 16m', price: 89, active: true },
        { id: 104, from: 'New York (JFK)', to: 'Tokyo (HND)', type: 'Flight', duration: '14h 05m', price: 920, active: false },
        { id: 105, from: 'New Delhi', to: 'Manali', type: 'Bus', duration: '12h 00m', price: 25, active: true },
        { id: 106, from: 'Mumbai', to: 'Pune', type: 'Cab', duration: '3h 15m', price: 40, active: true }
    ];
    res.json(routes);
});

// ==========================================================================
// 3. GET /offers - Promo codes & deals
// ==========================================================================
app.get('/offers', (req, res) => {
    const offers = [
        {
            id: 201,
            code: 'FLYINK25',
            title: 'First Flight Discount',
            description: 'Save 25% on your first flight booking. Up to $50 discount.',
            category: 'Flight',
            discount: '25% OFF',
            bgGradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
        },
        {
            id: 202,
            code: 'STAYINK15',
            title: 'Luxury Hotel Deal',
            description: 'Get 15% off at partner luxury hotels. Applicable for minimum 3 nights stay.',
            category: 'Hotels',
            discount: '15% OFF',
            bgGradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)'
        },
        {
            id: 203,
            code: 'ADVENTURE20',
            title: 'Weekend Getaways',
            description: 'Special 20% off on boutique holiday packages globally.',
            category: 'Holiday Packages',
            discount: '20% OFF',
            bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)'
        },
        {
            id: 204,
            code: 'ROADS10',
            title: 'Road Trip Specials',
            description: 'Save 10% on intercity cab bookings. Free cancellation.',
            category: 'Cab',
            discount: '10% OFF',
            bgGradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
        }
    ];
    res.json(offers);
});

// ==========================================================================
// 4. GET /popular - Popular destinations cards
// ==========================================================================
app.get('/popular', (req, res) => {
    const popularDestinations = [
        {
            id: 301,
            location: 'Bali, Indonesia',
            price: '$450',
            originalPrice: '$550',
            offer: '18% OFF',
            rating: 4.8,
            reviewsCount: '1,240 reviews',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80',
            description: 'Tropical beaches, historic temples, and lush terraced rice fields.'
        },
        {
            id: 302,
            location: 'Paris, France',
            price: '$580',
            originalPrice: '$680',
            offer: '15% OFF',
            rating: 4.9,
            reviewsCount: '3,450 reviews',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80',
            description: 'Iconic cafes, fashion houses, art museums, and the Eiffel Tower.'
        },
        {
            id: 303,
            location: 'Tokyo, Japan',
            price: '$720',
            originalPrice: '$800',
            offer: '10% OFF',
            rating: 4.7,
            reviewsCount: '980 reviews',
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=500&q=80',
            description: 'Neo-futuristic skyscrapers, bustling streets, and traditional shrines.'
        },
        {
            id: 304,
            location: 'Rome, Italy',
            price: '$390',
            originalPrice: '$480',
            offer: '20% OFF',
            rating: 4.8,
            reviewsCount: '2,100 reviews',
            image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=500&q=80',
            description: 'Gladiatorial ruins, majestic fountains, and world-class Italian cuisine.'
        }
    ];
    res.json(popularDestinations);
});

// ==========================================================================
// 5. GET /hotels - Dynamic list of hotels
// ==========================================================================
app.get('/hotels', (req, res) => {
    const hotels = [
        { id: 401, name: 'The Grand Ink Hotel', location: 'London', price: 140, rating: 4.7, amenities: ['Free WiFi', 'Pool', 'Breakfast'] },
        { id: 402, name: 'Eiffel View Suites', location: 'Paris', price: 189, rating: 4.9, amenities: ['Free WiFi', 'Balcony', 'AC'] },
        { id: 403, name: 'Tokyo Tower Resort', location: 'Tokyo', price: 210, rating: 4.6, amenities: ['Spa', 'Gym', 'Bar'] },
        { id: 404, name: 'Colosseum Lodge', location: 'Rome', price: 95, rating: 4.4, amenities: ['Free WiFi', 'Kitchen'] }
    ];
    res.json(hotels);
});

// ==========================================================================
// 6. GET /flights - Dynamic list of flights
// ==========================================================================
app.get('/flights', (req, res) => {
    const flights = [
        { id: 501, airline: 'British Airways', number: 'BA-240', depTime: '09:30 AM', arrTime: '11:45 AM', duration: '2h 15m', price: 120 },
        { id: 502, airline: 'Air France', number: 'AF-105', depTime: '02:15 PM', arrTime: '04:30 PM', duration: '2h 15m', price: 145 },
        { id: 503, airline: 'Japan Airlines', number: 'JL-006', depTime: '11:30 AM', arrTime: '03:40 PM', duration: '12h 10m', price: 780 },
        { id: 504, airline: 'Emirates', number: 'EK-510', depTime: '10:00 PM', arrTime: '08:20 AM', duration: '8h 20m', price: 620 }
    ];
    res.json(flights);
});

// Redirect dashboard root to html file
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Catch-all route to serve login page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`[SERVER] BookInk Backend Server running successfully on http://localhost:${PORT}`);
});
