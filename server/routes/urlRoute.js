const express = require('express');
const Url = require('../models/urlModel');
const  utils  = require('../utils')

const router = express.Router()
router.post('/shorten', async(req, res) => {
    const originalUrl= req.body.originalUrl;
    const miniUrl = req.body.miniUrl;
    if (!utils.validateUrl(originalUrl)){
        res.status(400).json('Invalid Url')
    }else{
        const newUrl = new Url({
            originalUrl,
            miniUrl
        });
        await newUrl.save();
        res.json(newUrl);
    }
})


router.get('/:id([a-z0-9]{5})', async(req, res) => {
    const miniUrl = req.params.id;
    const data = await Url.findOne({miniUrl: miniUrl}).exec();
    const originalUrl = data.originalUrl;
    res.redirect(307, originalUrl.toString())
})

module.exports = router 