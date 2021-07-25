const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    item_image:{
        type:String,
        required:false
    },
    item_code:{
        type:String,
        required:true,
    },
    category:{
        type:Array,
        required:true,
        default:'Other'
    },
    item_type:{
        type:String,
        required:true,
        default:'Product'
    },
    item_detail:{
        type:String,
        required:false
    },
    amount:{
        type:Number,
        required:true
    },
    tax_rate:{
        type:Number,
        required:true
    },
    is_inventry:{
        type:Boolean,
        required:true
    },
    unit:{
        type:String,
        required:false,
        default:'FEETS'
    }
});

module.exports = mongoose.model('item',itemSchema);