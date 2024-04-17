import express from 'express';

var router = express.Router();

import getURLPreview from '../utils/urlPreviews.js';

router.get('/preview', async (req, res) => {
    try {
        let urlPreview = await getURLPreview(req.query.url);
        res.send(urlPreview);
    }
    catch(err) {
        console.log("Error getting preview of url", err);
        res.status(500).send("Error getting preview of url");
    }
});

export default router;