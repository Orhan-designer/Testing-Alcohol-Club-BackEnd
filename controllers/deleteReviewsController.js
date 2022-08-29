const db = require('../settings/mysqlDb');

exports.deleteReviews = (req, res) => {
    console.log(req.query)
    try {
        const userId = req.query.userId;
        const mongoId = req.query.mongoId;

        const deleteReviews = "DELETE FROM allReviews";

        db.query(deleteReviews, (error, result) => {
            if (error) {
                return res.status(400).json({ error: 'Cannot delete review' });
            } else {
                return res.status(200).json({ message: 'Reviews was deleted', result });
            }
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}