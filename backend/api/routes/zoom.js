const express = require('express');
const zoomRouter = express.Router();
const {assignCode} =require('../../services/zoom');
const request = require("request");
const checkAuth = require('./middleware/check-auth');
//takes in email, and code
//associates auth token with email
zoomRouter.post('/create',checkAuth,async (req,res)=>{
    const code =req.body.code;
    console.log(req.userData);
    assignCode(code,req.userData);
    res.send(200);
});


module.exports=zoomRouter;
