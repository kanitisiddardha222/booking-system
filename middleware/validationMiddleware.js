/**
 * Validation middleware for search requests.
 * Checks for presence and correctness of query parameters.
 */
module.exports = (req, res, next) => {
    const { source, destination, departureDate, passengers } = req.query;
    const path = req.path.toLowerCase();

    const errors = [];

    // Helper to validate date format (YYYY-MM-DD)
    const isValidDate = (dateString) => {
        if (!dateString) return false;
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;  // Invalid format
        const d = new Date(dateString);
        const dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, invalid date
        return d.toISOString().slice(0, 10) === dateString;
    };

    if (path.includes('/hotel')) {
        // Hotel validation
        if (!source || source.trim().length < 2) {
            errors.push({ field: 'source', message: 'Location is required and must be at least 2 characters.' });
        }
        if (!departureDate) {
            errors.push({ field: 'departureDate', message: 'Check-in date is required.' });
        } else if (!isValidDate(departureDate)) {
            errors.push({ field: 'departureDate', message: 'Check-in date must be a valid date in YYYY-MM-DD format.' });
        }
    } else {
        // Transit validation (flight, train, bus)
        if (!source || source.trim().length < 2) {
            errors.push({ field: 'source', message: 'Source point is required and must be at least 2 characters.' });
        }
        if (!destination || destination.trim().length < 2) {
            errors.push({ field: 'destination', message: 'Destination point is required and must be at least 2 characters.' });
        }
        if (!departureDate) {
            errors.push({ field: 'departureDate', message: 'Travel date is required.' });
        } else if (!isValidDate(departureDate)) {
            errors.push({ field: 'departureDate', message: 'Travel date must be a valid date in YYYY-MM-DD format.' });
        }
    }

    if (passengers) {
        const parsed = parseInt(passengers, 10);
        if (isNaN(parsed) || parsed < 1) {
            errors.push({ field: 'passengers', message: 'Passengers count must be a positive integer.' });
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed.',
            errors
        });
    }

    next();
};
