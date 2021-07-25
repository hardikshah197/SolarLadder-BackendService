const mongoose = require('mongoose');
const itemSchema = require('./item');
const inventrySchema = new mongoose.Schema({
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: itemSchema
    },
    open_stock:{
        type:Number,
        required:true
    },
    low_warning:{
        type:Boolean,
        required:false
    },
    lower_limit:{
        type:Number,
        required:false
    },
    date:{
        type:String,
        required:false
    }
});

module.exports = new mongoose.model('inventry',inventrySchema);