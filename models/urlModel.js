// ODM (object data modeling library for mongodb and node.js)
// It manges the relation between monogodb driver and node.js (In between)
const mongoose = require('mongoose');
const shortId = require('shortid');

//==========================
// Define my url schema
const Schema = mongoose.Schema;

// let's structure my url Schema (the shape)
const urlSchema = new Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate // every time we create a full url it generate a short url
        // default: myFunc, is a short written func which is equeal to default: () => {}
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });// to add the time of creation and any further update

//==============================================
// Create our model
// Constructor that takes the schema and create an instance of url
const URL = mongoose.model('URL', urlSchema);

//======================================
// Export my model to use it anywhere
module.exports = URL;