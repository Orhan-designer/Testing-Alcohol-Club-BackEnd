const db = require('./../settings/mysqlDb');

exports.updateReviewAndRating = (req, res) => {
    try {
        const id = req.body.id;
        const selectFromTable = "SELECT mongoId FROM drinksRating WHERE mongoId = '" + id + "'";

        db.query(selectFromTable, (error, selectResult) => {
            if (error) {
                return res.status(400).json({ error: error });
            } else {
                const rating = req.body.rating;
                const feedBack = req.body.feedBack;
                const dateOfDegustation = req.body.dateOfDegustation;

                const updateTable = "UPDATE drinksRating SET rating = '" +
                    rating + "', feedBack = '" +
                    feedBack + "', dateOfDegustation = '" +
                    dateOfDegustation + "' WHERE mongoId = '" + id + "'";

                db.query(updateTable, (error, updateResult) => {
                    if (error) {
                        return res.status(400).json({ error: error });
                    } else {
                        return res.status(200).json({ result: 'Table data was updated successfully', updateResult });
                    }
                });
            }
        })
    } catch (error) {
        return res.status(400).json({ error: 'Error' });
    }
}
