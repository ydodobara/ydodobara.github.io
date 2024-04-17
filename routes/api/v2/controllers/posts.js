import express from 'express';

var router = express.Router();

import getURLPreview from '../utils/urlPreviews.js';

router.post('/', async(req, res) => {

    try {
        const newPost = new req.models.Post({
            username: req.body.username,
            url: req.body.url,
            description: req.body.description,
            created_date: new Date(),
        });

        await newPost.save();

        res.json({"status": "success"});

    }
    catch(err) {
        console.log("Error connecting to db", err);
        res.status(500).json({"status": "error", "error": err});
    }
});

router.get('/', async function(req, res) {
    try{
      let allPosts = await req.models.Post.find();
      let postData = await Promise.all(
        allPosts.map(async post => {
            try {
                let {username, description, url} = post;
                let htmlPreview = await getURLPreview(url);
                return {username, description, htmlPreview};
            }
            catch(error) {
                console.log("Error:", error);
                return {description, error};
            }
        })
        
      );
      res.send(postData);
    } catch(error){
      console.log("Error:", error);
      res.status(500).json({"status": "error", "error": error});
    }
});

export default router;