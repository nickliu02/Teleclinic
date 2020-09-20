const express = require('express');
const zoomRouter = express.Router();
const {assignCode,tokenRefresher} =require('../../services/zoom');
const request = require("request");
const checkAuth = require('./middleware/check-auth');
//takes in email, and code
//associates auth token with email
zoomRouter.post('/create',checkAuth,async (req,res)=>{
    const code =req.body.code;
    assignCode(code,req.userData);
    res.send(200);
});

zoomRouter.get('/python',async (req,res) => {
    tokenRefresher();
    console.log("refreshed")
    res.send(200);
})


module.exports=zoomRouter;
