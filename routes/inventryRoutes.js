const express = require('express');
const router  = express.Router();
const httpStatusCode = require('http-status-codes');
const inventrySchema = require('../model/inventry');
const fetch = require('node-fetch');

router.get('/inventry',(req,res)=>{
    const {itemId} = req.body;
    inventrySchema.find({})
    .then(data => {
        res.status(httpStatusCode.OK).json({data});
    })
    .catch(err => {
        const message = `inventry with itemID :: ${itemId} not found :: ${err}`;
        res.status(httpStatusCode.NOT_FOUND).json({message});
    })
});

router.post('/inventry',(req,res)=>{
    const {name,item_code,category,item_detail,item_image,amount,tax_rate,item_type,unit,open_stock,low_warning,lower_limit,date} = req.body;
    let message;
    const url='http://localhost:5000/api/item';
    const options = {
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name,
            item_image,
            item_code,
            category,
            item_detail,
            amount,
            item_type,
            tax_rate,
            is_inventry:true
        })
    }
    fetch(url,options)
    .then(resp => resp.json())
    .then(result => {
        if(result.data)
            return inventrySchema.create({itemId: result.data["_id"], unit,open_stock,low_warning,lower_limit,date});
        return Promise.reject(`inventry cannot be create :: ${result}`);
    })
    .then(data => {
        message=`inventry created`;
        res.status(httpStatusCode.OK).json({message,data});
    })
    .catch(err => {
        message=`inventry not created :: ${err}`;
        res.status(httpStatusCode.FORBIDDEN).json({message})
    });
});

router.put('/inventry',(req,res)=>{
    const {itemId,inventryId,name,item_code,category,item_detail,item_image,unit,tax_rate,amount,item_type,open_stock,low_warning,lower_limit,date} = req.body;
    let message;
    const url='http://localhost:5000/api/item';
    const options = {
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({itemId,name,item_code,category,item_detail,unit,amount,item_image,item_type,tax_rate,is_inventry:true})
    }
    fetch(url,options)
    .then(resp => resp.json())
    .then(result => {
        if(result.message)
            return inventrySchema.findOneAndUpdate({_id:inventryId}, { $set: {open_stock, low_warning, lower_limit, date}})
        return Promise.reject(`inventry cannot be create :: ${result}`);
    })
    .then(() => {
        message=`inventry with inventryId :: ${inventryId} updated`;
        res.status(httpStatusCode.OK).json({message, inventryId});
    })
    .catch(err => {
        message=`inventry iwth itemId :: ${itemId} not updated :: ${err}`;
        res.status(httpStatusCode.FORBIDDEN).json({message});
    })
})

module.exports = router;