const express = require('express');
const router = express.Router();
const httpStatusCode = require('http-status-codes');
const itemSchema = require('../model/item');

router.get('/item',(req,res)=>{
    itemSchema.find({})
    .then(data => {
        res.status(httpStatusCode.OK).json({data})
    })
    .catch(err => {
        const message=`item with item_name :: ${name} not found :: ${err}`;
        res.status(httpStatusCode.NOT_FOUND).json({message});
    })
});

router.post('/item',(req,res)=>{
    const {name,item_code,category,is_inventry,unit,item_detail,amount,item_image,item_type,tax_rate} = req.body;
    let message;
    itemSchema.create({name,item_code,category,item_detail,amount,unit,item_image,item_type,tax_rate,is_inventry})
    .then(data => {
        message=`item created`;
        res.status(httpStatusCode.OK).json({message, data});
    })
    .catch(err => {
        message=`item with item name :: ${name} not created :: ${err}`;
        res.status(httpStatusCode.FORBIDDEN).json({message})
    });
});

router.put('/item',(req,res)=>{
    const {itemId,name,item_code,is_inventry,unit,item_detail,amount,item_image,item_type,category,tax_rate} = req.body;
    let message;
    itemSchema.findOneAndUpdate({_id:itemId},{ $set: {name,item_code,item_image,item_detail,category,amount,unit,item_type,tax_rate,is_inventry}})
    .then(() => {
        message=`item with itemId :: ${itemId} updated`;
        res.status(httpStatusCode.OK).json({message,itemId});
    })
    .catch(err => {
        message=`item with item name :: ${name} not updated :: ${err}`;
        res.status(httpStatusCode.FORBIDDEN).json({message})
    })
});

module.exports = router;