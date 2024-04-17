import express from 'express';

var router = express.Router();

import getURLPreview from '../utils/urlPreviews.js';

router.get('/preview', async (req, res) => {
    try {
        getURLPreview(req.query.url);
        res.send("Success");
    }
    catch(err) {
        console.log("Error getting preview of url", err);
        res.status(500).send("Error getting preview of url");
    }
});

export default router;