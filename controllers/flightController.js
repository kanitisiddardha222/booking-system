const searchService = require('../services/searchService');

/**
 * Controller to handle Flight searches.
 */
exports.searchFlights = (req, res, next) => {
    try {
        const { source, destination, departureDate, passengers, sort, page, limit, ...filters } = req.query;
        
        const criteria = { source, destination, departureDate, passengers };
        
        const data = searchService.searchFlights(criteria, filters, sort, page, limit);
        
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
};
