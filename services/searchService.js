// Mock Databases for Searchable Tickets
const flightsDb = [
    { id: 'f-101', operatorName: 'Emirates', airline: 'Emirates', logoUrl: 'https://img.icons8.com/color/48/emirates.png', departureTime: '08:30 AM', arrivalTime: '11:45 AM', duration: '3h 15m', durationMinutes: 195, availableSeats: 12, price: 299, rating: 4.8, amenities: ['WiFi', 'In-flight Meal', 'Extra Legroom', 'USB Charging'], departureStation: 'LHR', arrivalStation: 'CDG' },
    { id: 'f-102', operatorName: 'British Airways', airline: 'British Airways', logoUrl: 'https://img.icons8.com/color/48/british-airways.png', departureTime: '10:00 AM', arrivalTime: '11:15 AM', duration: '1h 15m', durationMinutes: 75, availableSeats: 5, price: 149, rating: 4.5, amenities: ['WiFi', 'Power Outlets', 'Beverages'], departureStation: 'LHR', arrivalStation: 'CDG' },
    { id: 'f-103', operatorName: 'Air France', airline: 'Air France', logoUrl: 'https://img.icons8.com/color/48/air-france.png', departureTime: '01:30 PM', arrivalTime: '02:45 PM', duration: '1h 15m', durationMinutes: 75, availableSeats: 25, price: 120, rating: 4.6, amenities: ['WiFi', 'In-flight Meal', 'USB Charging'], departureStation: 'LHR', arrivalStation: 'CDG' },
    { id: 'f-104', operatorName: 'Lufthansa', airline: 'Lufthansa', logoUrl: 'https://img.icons8.com/color/48/lufthansa.png', departureTime: '04:15 PM', arrivalTime: '08:30 PM', duration: '4h 15m', durationMinutes: 255, availableSeats: 8, price: 340, rating: 4.4, amenities: ['WiFi', 'In-flight Meal', 'Extra Legroom', 'Entertainment'], departureStation: 'LHR', arrivalStation: 'CDG' },
    { id: 'f-105', operatorName: 'Qatar Airways', airline: 'Qatar Airways', logoUrl: 'https://img.icons8.com/color/48/qatar-airways.png', departureTime: '09:00 PM', arrivalTime: '11:55 PM', duration: '2h 55m', durationMinutes: 175, availableSeats: 18, price: 420, rating: 4.9, amenities: ['WiFi', 'Premium Meal', 'Extra Legroom', 'USB Charging', 'Lie-flat Seat'], departureStation: 'LHR', arrivalStation: 'CDG' },
    { id: 'f-106', operatorName: 'Ryanair', airline: 'Ryanair', logoUrl: 'https://img.icons8.com/color/48/ryanair.png', departureTime: '06:00 AM', arrivalTime: '07:15 AM', duration: '1h 15m', durationMinutes: 75, availableSeats: 42, price: 45, rating: 3.8, amenities: ['Paid Meals'], departureStation: 'LHR', arrivalStation: 'CDG' },
    { id: 'f-107', operatorName: 'EasyJet', airline: 'EasyJet', logoUrl: 'https://img.icons8.com/color/48/easyjet.png', departureTime: '11:45 AM', arrivalTime: '01:05 PM', duration: '1h 20m', durationMinutes: 80, availableSeats: 30, price: 65, rating: 4.0, amenities: ['USB Charging', 'Paid Meals'], departureStation: 'LHR', arrivalStation: 'CDG' },
    { id: 'f-108', operatorName: 'Wizz Air', airline: 'Wizz Air', logoUrl: 'https://img.icons8.com/color/48/wizzair.png', departureTime: '03:10 PM', arrivalTime: '04:30 PM', duration: '1h 20m', durationMinutes: 80, availableSeats: 15, price: 55, rating: 3.7, amenities: ['Paid Meals'], departureStation: 'LHR', arrivalStation: 'CDG' },
    { id: 'f-109', operatorName: 'Singapore Airlines', airline: 'Singapore Airlines', logoUrl: 'https://img.icons8.com/color/48/singapore-airlines.png', departureTime: '10:45 PM', arrivalTime: '02:00 AM', duration: '3h 15m', durationMinutes: 195, availableSeats: 4, price: 499, rating: 4.9, amenities: ['WiFi', 'Premium Meal', 'Extra Legroom', 'USB Charging', 'Premium Drinks'], departureStation: 'LHR', arrivalStation: 'CDG' },
    { id: 'f-110', operatorName: 'Turkish Airlines', airline: 'Turkish Airlines', logoUrl: 'https://img.icons8.com/color/48/turkish-airlines.png', departureTime: '06:45 PM', arrivalTime: '10:15 PM', duration: '3h 30m', durationMinutes: 210, availableSeats: 20, price: 210, rating: 4.3, amenities: ['WiFi', 'In-flight Meal', 'USB Charging'], departureStation: 'LHR', arrivalStation: 'CDG' }
];

const trainsDb = [
    { id: 't-201', operatorName: 'Eurostar Express', logoUrl: 'https://img.icons8.com/color/48/train.png', departureTime: '07:01 AM', arrivalTime: '09:17 AM', duration: '2h 16m', durationMinutes: 136, availableSeats: 45, price: 110, rating: 4.7, AC: true, sleeper: false, luxury: true, amenities: ['Free WiFi', 'Power Outlets', 'Pantry Car', 'Extra Legroom'], departureStation: 'St Pancras', arrivalStation: 'Gare du Nord' },
    { id: 't-202', operatorName: 'Eurostar Standard', logoUrl: 'https://img.icons8.com/color/48/train.png', departureTime: '09:24 AM', arrivalTime: '11:47 AM', duration: '2h 23m', durationMinutes: 143, availableSeats: 112, price: 79, rating: 4.4, AC: true, sleeper: false, luxury: false, amenities: ['Free WiFi', 'Power Outlets', 'Snack Bar'], departureStation: 'St Pancras', arrivalStation: 'Gare du Nord' },
    { id: 't-203', operatorName: 'Eurostar Nightliner', logoUrl: 'https://img.icons8.com/color/48/train.png', departureTime: '11:15 PM', arrivalTime: '05:30 AM', duration: '6h 15m', durationMinutes: 375, availableSeats: 28, price: 155, rating: 4.5, AC: true, sleeper: true, luxury: true, amenities: ['Private Cabin', 'Free WiFi', 'Breakfast Included', 'Charging Outlets'], departureStation: 'St Pancras', arrivalStation: 'Gare du Nord' },
    { id: 't-204', operatorName: 'InterCity Rail', logoUrl: 'https://img.icons8.com/color/48/train.png', departureTime: '12:45 PM', arrivalTime: '03:10 PM', duration: '2h 25m', durationMinutes: 145, availableSeats: 85, price: 68, rating: 4.2, AC: true, sleeper: false, luxury: false, amenities: ['Power Outlets', 'Snack Bar'], departureStation: 'St Pancras', arrivalStation: 'Gare du Nord' },
    { id: 't-205', operatorName: 'Royal Express', logoUrl: 'https://img.icons8.com/color/48/train.png', departureTime: '02:30 PM', arrivalTime: '04:45 PM', duration: '2h 15m', durationMinutes: 135, availableSeats: 10, price: 250, rating: 4.9, AC: true, sleeper: false, luxury: true, amenities: ['Free WiFi', 'Fine Dining', 'Welcome Drinks', 'Plush Seats'], departureStation: 'St Pancras', arrivalStation: 'Gare du Nord' },
    { id: 't-206', operatorName: 'Regional Trans', logoUrl: 'https://img.icons8.com/color/48/train.png', departureTime: '05:10 AM', arrivalTime: '08:50 AM', duration: '3h 40m', durationMinutes: 220, availableSeats: 150, price: 42, rating: 3.9, AC: false, sleeper: false, luxury: false, amenities: ['Luggage Rack'], departureStation: 'St Pancras', arrivalStation: 'Gare du Nord' },
    { id: 't-207', operatorName: 'Eurostar Evening', logoUrl: 'https://img.icons8.com/color/48/train.png', departureTime: '06:01 PM', arrivalTime: '08:22 PM', duration: '2h 21m', durationMinutes: 141, availableSeats: 60, price: 89, rating: 4.5, AC: true, sleeper: false, luxury: false, amenities: ['Free WiFi', 'Power Outlets', 'Snack Bar'], departureStation: 'St Pancras', arrivalStation: 'Gare du Nord' }
];

const busesDb = [
    { id: 'b-301', operatorName: 'BlaBlaCar Bus', logoUrl: 'https://img.icons8.com/color/48/bus.png', departureTime: '07:30 AM', arrivalTime: '03:45 PM', duration: '8h 15m', durationMinutes: 495, availableSeats: 22, price: 29, rating: 4.2, AC: true, sleeper: false, luxury: false, amenities: ['WiFi', 'Charging Port', 'Reclining Seats'], departureStation: 'Victoria Coach Station', arrivalStation: 'Gallieni' },
    { id: 'b-302', operatorName: 'FlixBus Premium', logoUrl: 'https://img.icons8.com/color/48/bus.png', departureTime: '09:00 AM', arrivalTime: '04:30 PM', duration: '7h 30m', durationMinutes: 450, availableSeats: 8, price: 39, rating: 4.4, AC: true, sleeper: false, luxury: true, amenities: ['WiFi', 'Charging Port', 'Extra Legroom', 'Restroom'], departureStation: 'Victoria Coach Station', arrivalStation: 'Gallieni' },
    { id: 'b-303', operatorName: 'National Express Overnight', logoUrl: 'https://img.icons8.com/color/48/bus.png', departureTime: '10:30 PM', arrivalTime: '06:45 AM', duration: '8h 15m', durationMinutes: 495, availableSeats: 15, price: 45, rating: 4.5, AC: true, sleeper: true, luxury: true, amenities: ['Sleeper Berth', 'WiFi', 'Charging Port', 'Blankets & Pillows'], departureStation: 'Victoria Coach Station', arrivalStation: 'Gallieni' },
    { id: 'b-304', operatorName: 'RegioJet Budget', logoUrl: 'https://img.icons8.com/color/48/bus.png', departureTime: '06:15 AM', arrivalTime: '03:00 PM', duration: '8h 45m', durationMinutes: 525, availableSeats: 35, price: 18, rating: 3.9, AC: true, sleeper: false, luxury: false, amenities: ['Charging Port', 'Water Bottle'], departureStation: 'Victoria Coach Station', arrivalStation: 'Gallieni' },
    { id: 'b-305', operatorName: 'Alsa Luxury Liner', logoUrl: 'https://img.icons8.com/color/48/bus.png', departureTime: '01:00 PM', arrivalTime: '08:30 PM', duration: '7h 30m', durationMinutes: 450, availableSeats: 12, price: 55, rating: 4.8, AC: true, sleeper: false, luxury: true, amenities: ['WiFi', 'Entertainment Screen', 'Snacks', 'Charging Port'], departureStation: 'Victoria Coach Station', arrivalStation: 'Gallieni' },
    { id: 'b-306', operatorName: 'Transdev Coach', logoUrl: 'https://img.icons8.com/color/48/bus.png', departureTime: '03:45 PM', arrivalTime: '12:15 AM', duration: '8h 30m', durationMinutes: 510, availableSeats: 40, price: 24, rating: 4.0, AC: true, sleeper: false, luxury: false, amenities: ['Charging Port'], departureStation: 'Victoria Coach Station', arrivalStation: 'Gallieni' }
];

const hotelsDb = [
    { id: 'h-401', operatorName: 'The Ritz-Carlton London', logoUrl: 'https://img.icons8.com/color/48/hotel.png', price: 450, rating: 5, customerRating: 4.9, availableRooms: 3, location: 'London', amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Gym', 'Breakfast Included', 'AC'] },
    { id: 'h-402', operatorName: 'Novotel Paris Centre', logoUrl: 'https://img.icons8.com/color/48/hotel.png', price: 175, rating: 4, customerRating: 4.3, availableRooms: 12, location: 'Paris', amenities: ['Free WiFi', 'Gym', 'Restaurant', 'AC'], description: 'Modern hotel located in the heart of Paris with beautiful views.' },
    { id: 'h-403', operatorName: 'Ibis Budget Rome', logoUrl: 'https://img.icons8.com/color/48/hotel.png', price: 65, rating: 3, customerRating: 3.8, availableRooms: 20, location: 'Rome', amenities: ['Free WiFi', 'AC', 'Pet Friendly'] },
    { id: 'h-404', operatorName: 'Shibuya Grand Hotel Tokyo', logoUrl: 'https://img.icons8.com/color/48/hotel.png', price: 210, rating: 4, customerRating: 4.6, availableRooms: 8, location: 'Tokyo', amenities: ['Free WiFi', 'Spa', 'Gym', 'Breakfast Included', 'AC'] },
    { id: 'h-405', operatorName: 'Taj Mahal Palace Mumbai', logoUrl: 'https://img.icons8.com/color/48/hotel.png', price: 380, rating: 5, customerRating: 4.9, availableRooms: 4, location: 'Mumbai', amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Gym', 'Butler Service', 'AC'] },
    { id: 'h-406', operatorName: 'Hilton London Metropole', logoUrl: 'https://img.icons8.com/color/48/hotel.png', price: 220, rating: 4, customerRating: 4.4, availableRooms: 15, location: 'London', amenities: ['Free WiFi', 'Swimming Pool', 'Gym', 'Executive Lounge', 'AC'] },
    { id: 'h-407', operatorName: 'Radisson Blu CDG Paris', logoUrl: 'https://img.icons8.com/color/48/hotel.png', price: 150, rating: 4, customerRating: 4.2, availableRooms: 18, location: 'Paris', amenities: ['Free WiFi', 'AC', 'Airport Shuttle', 'Gym'] },
    { id: 'h-408', operatorName: 'Premium Suites London', logoUrl: 'https://img.icons8.com/color/48/hotel.png', price: 280, rating: 5, customerRating: 4.7, availableRooms: 5, location: 'London', amenities: ['Free WiFi', 'Spa', 'Gym', 'AC', 'Kitchenette'] },
    { id: 'h-409', operatorName: 'City Lodge New Delhi', logoUrl: 'https://img.icons8.com/color/48/hotel.png', price: 45, rating: 3, customerRating: 4.0, availableRooms: 25, location: 'New Delhi', amenities: ['Free WiFi', 'AC', 'Room Service'] }
];

/**
 * Filter, sort, and paginate array helper.
 */
const queryCollection = (items, filters, sort, page, limit) => {
    let results = [...items];

    // Apply Filters
    if (filters) {
        if (filters.maxPrice) {
            results = results.filter(item => item.price <= parseFloat(filters.maxPrice));
        }
        if (filters.minPrice) {
            results = results.filter(item => item.price >= parseFloat(filters.minPrice));
        }
        if (filters.minRating) {
            // For hotels we check hotel star rating, for others we check customerRating or rating
            results = results.filter(item => {
                const ratingVal = item.customerRating || item.rating;
                return ratingVal >= parseFloat(filters.minRating);
            });
        }
        if (filters.ac !== undefined) {
            const isAc = filters.ac === 'true';
            results = results.filter(item => item.AC === isAc || (item.amenities && item.amenities.includes('AC') === isAc));
        }
        if (filters.sleeper !== undefined) {
            results = results.filter(item => item.sleeper === (filters.sleeper === 'true'));
        }
        if (filters.luxury !== undefined) {
            results = results.filter(item => item.luxury === (filters.luxury === 'true'));
        }
        if (filters.airline) {
            const airlines = Array.isArray(filters.airline) ? filters.airline : [filters.airline];
            results = results.filter(item => item.airline && airlines.some(a => item.airline.toLowerCase() === a.toLowerCase()));
        }
        if (filters.hotelStars) {
            const stars = Array.isArray(filters.hotelStars) ? filters.hotelStars.map(Number) : [Number(filters.hotelStars)];
            results = results.filter(item => stars.includes(item.rating));
        }
        if (filters.departureTimeRange) {
            // Very simple hour parsing e.g. "morning" (before 12 PM), "afternoon" (12 PM - 6 PM), "night" (after 6 PM)
            results = results.filter(item => {
                if (!item.departureTime) return true;
                const [time, period] = item.departureTime.split(' ');
                const [hourStr] = time.split(':');
                let hour = parseInt(hourStr, 10);
                if (period === 'PM' && hour !== 12) hour += 12;
                if (period === 'AM' && hour === 12) hour = 0;

                if (filters.departureTimeRange === 'morning') return hour >= 5 && hour < 12;
                if (filters.departureTimeRange === 'afternoon') return hour >= 12 && hour < 18;
                if (filters.departureTimeRange === 'night') return hour >= 18 || hour < 5;
                return true;
            });
        }
    }

    // Apply Sorting
    if (sort) {
        switch (sort) {
            case 'price-asc':
                results.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                results.sort((a, b) => b.price - a.price);
                break;
            case 'duration-asc':
                // Transit duration sorting
                results.sort((a, b) => (a.durationMinutes || 0) - (b.durationMinutes || 0));
                break;
            case 'rating-desc':
                results.sort((a, b) => {
                    const ratingA = a.customerRating || a.rating;
                    const ratingB = b.customerRating || b.rating;
                    return ratingB - ratingA;
                });
                break;
            case 'recommended':
            default:
                // Default sorting (by rating and then price)
                results.sort((a, b) => {
                    const ratingA = a.customerRating || a.rating;
                    const ratingB = b.customerRating || b.rating;
                    if (ratingB !== ratingA) return ratingB - ratingA;
                    return a.price - b.price;
                });
        }
    }

    // Pagination
    const totalItems = results.length;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 5;
    const totalPages = Math.ceil(totalItems / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedItems = results.slice(startIndex, startIndex + limitNum);

    return {
        totalItems,
        totalPages,
        currentPage: pageNum,
        limit: limitNum,
        results: paginatedItems
    };
};

module.exports = {
    searchFlights: (criteria, filters, sort, page, limit) => {
        // Map any city queries into airport codes LHR/CDG
        return queryCollection(flightsDb, filters, sort, page, limit);
    },
    searchTrains: (criteria, filters, sort, page, limit) => {
        return queryCollection(trainsDb, filters, sort, page, limit);
    },
    searchBuses: (criteria, filters, sort, page, limit) => {
        return queryCollection(busesDb, filters, sort, page, limit);
    },
    searchHotels: (criteria, filters, sort, page, limit) => {
        // Filter by location query case-insensitively
        const locationQuery = (criteria.source || '').toLowerCase().trim();
        const matchedHotels = hotelsDb.filter(h => h.location.toLowerCase().includes(locationQuery));
        return queryCollection(matchedHotels, filters, sort, page, limit);
    }
};
