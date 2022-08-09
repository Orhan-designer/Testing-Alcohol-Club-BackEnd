const db = require('./../settings/mysqlDb');

exports.updateReviewAndRating = (req, res) => {
    try {
        const mongoId = req.body.mongoId;
        const userId = req.body.userId;

        const selectFromTable = "SELECT mongoId, userId FROM drinksRating WHERE mongoId = '" + mongoId + "' AND userId = '" + userId + "'";

        db.query(selectFromTable, (error, selectResult) => {
            if (error) {
                return res.status(400).json({ error: error });
            } else {
                const firstName = req.body.firstName;
                const rating = req.body.rating;
                const feedBack = req.body.feedBack;
                const dateOfDegustation = req.body.dateOfDegustation;

                const updateTable = "UPDATE drinksRating SET userName = '" +
                    firstName + "', userId = '" +
                    userId + "', rating = '" +
                    rating + "', feedBack = '" +
                    feedBack + "', dateOfDegustation = '" +
                    dateOfDegustation + "' WHERE mongoId = '" + mongoId + "'";

                db.query(updateTable, (error, updateResult) => {
                    if (error) {
                        return res.status(400).json({ error: error });
                    } else {
                        return res.status(200).json({ message: 'Data was updated successfully', updateResult });
                    }
                });
            }
        })
    } catch (error) {
        return res.status(400).json({ error: 'Error' });
    }
}
