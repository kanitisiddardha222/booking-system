const searchService = require('../services/searchService');

/**
 * Controller to handle Hotel searches.
 */
exports.searchHotels = (req, res, next) => {
    try {
        const { source, departureDate, returnDate, passengers, sort, page, limit, ...filters } = req.query;
        
        const criteria = { source, departureDate, returnDate, passengers };
        
        const data = searchService.searchHotels(criteria, filters, sort, page, limit);
        
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
};
