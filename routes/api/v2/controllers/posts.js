import express from 'express';

var router = express.Router();

import getURLPreview from '../utils/urlPreviews.js';

router.post('/', async (req, res) => {

    try {
        const newPost = new req.models.Post({
            url: req.body.url,
            description: req.body.description,
            created_date: newDate()
        });

        await newPost.save();

        res.send("Success");

        res.status(500).json({"status": "success"});

    }
    catch(err) {
        console.log("Error connecting to db", err);
        res.status(500).json({"status": "error", "error": error});
    }
});

router.get('/', async function(req, res, next) {
    try{
      let allPosts = await req.models.Post.find()
      let postData = await Promise.all(
        allPosts.map(async post => {
            try {
                let {description, url} = post;
                let htmlPreview = await getURLPreview(url);
                return {description: description, htmlPreview: htmlPreview};
            }
            catch(error) {
                console.log("Error:", error);
                return {description: "error", htmlPreview: error}
            }
        })
      )
    } catch(error){
      console.log("Error:", error);
      res.status(500).json({"status": "error", "error": error});
    }
    return postData;
});

export default router;