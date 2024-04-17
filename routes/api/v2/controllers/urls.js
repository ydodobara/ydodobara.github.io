import express from 'express';

var router = express.Router();

import getURLPreview from '../utils/urlPreviews.js';

router.post('/preview', async (req, res) => {

    try {
        getURLPreview(req.query.url);
        res.send("Success");
    }
    catch(err) {
        console.log("Error connecting to db", err);
        res.status(500).json({"status": "error", "error": err});
    }
});

export default router;