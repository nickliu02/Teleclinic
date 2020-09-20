const express = require('express');
const {update,profile} = require('../../services/info');

const checkAuth = require('./middleware/check-auth');

const infoRouter = express.Router();

infoRouter.post('/update', checkAuth, async (req,res,next)=>{
    const {first_name, last_name, phone_number,health_card_number} = req.body;

    await update(req.userData, first_name, last_name, phone_number, health_card_number);
    
    res.send({});
});

infoRouter.get('/profile', checkAuth, async (req,res,next)=>{
    
    const info = await profile(req.userData);
    console.log(info,"info")
    res.json(info);
});





module.exports = infoRouter;