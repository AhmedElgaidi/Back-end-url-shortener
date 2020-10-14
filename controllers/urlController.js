// Import our model
const URL = require('../models/urlModel');

// MDN naming convention
// (1) url_index_get
// (2) url_index_post
// (3) url_redirect
// (4) url_delete

// (1) 
const url_index_get = async (req, res) => {
    const shortUrls = await URL.find().sort( {createdAt: -1 })
    res.render('index', { title: 'URL Shortner', shortUrls: shortUrls, hostname: req.hostname });

};

// (2)
const url_index_post = async(req, res) => {
    if (req.body.fullURL.length > 0) URL.create({ full: req.body.fullURL });
    await res.redirect('/');
};

// (3)
const url_redirect = async (req, res) => {
    const shortURL = await URL.findOne({ short: req.params.short});
    if (!shortURL) res.render('404', { title: 'NOT FOUND'})
    if (shortURL) {
        await shortURL.clicks++;
        await shortURL.save();
        await res.redirect(shortURL.full);
    }
};

// (4)
const url_delete = (req, res) => {
    URL.findOneAndDelete({ short: req.params.short })
    .then(result => res.redirect('/'))
    .catch(err => console.log(err));
};

module.exports = {
    url_index_get,
    url_index_post,
    url_redirect,
    url_delete
};