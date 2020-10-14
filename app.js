// Core modules

// 3rd party modules
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Custom modules
const urlRoutes = require('./routes/urlRoute');//my routes

//==============================================
// create my express app instance
const app = express()

//==============================================
// Connect to my database
const PORT = process.env.PORT || 5000;
const URI = 'mongodb+srv://elbotanist:elbotanist@cluster0.iujbk.mongodb.net/nodeDatabase?retryWrites=true&w=majority';
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})// this is a promise
    .then(() => app.listen(PORT) && console.log(`Server is running on port ${PORT}...`))
    .catch(err => err.message);

//================================================
// My middlewares

// (1) Register my view engine (ejs);
app.set('view engine', 'ejs');

// (2) To use URL params
// To access the url encoded data, and pass it to an object (body)
// So, we can use it req.body
app.use(express.urlencoded( { extended: true }));

// (3) Sometimes, when we need to override the client method (get,post)
// to send a delete or put method to my server, we need to use an external library to do it
app.use(methodOverride( '_method' ));

//================================
// (4) My routes
app.use(urlRoutes);
app.use('', (req, res) => {
    res.status(404).render('404', { title: 'NOT FOUND' });
});
