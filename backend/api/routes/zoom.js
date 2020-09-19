const express = require('express');
const zoomRouter = express.Router();
const {assignCode} =require('../../services/zoom');
var request = require("request");
//takes in email, and code
//associates auth token with email
zoomRouter.post('/create',async (req,res)=>{
    const {code} =req.body;
    assignCode(code,req.userData);
    res.send(200);
});


module.exports=zoomRouter;
