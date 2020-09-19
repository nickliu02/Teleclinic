const express = require('express');
const {info} = require('../../services/info');

const checkAuth = require('./middleware/check-auth');

const infoRouter = express.Router();

infoRouter.post('/update', checkAuth, async (req,res,next)=>{
    const {first_name, last_name, phone_number,health_card_number} = req.body;

    await update(req.userData, first_name, last_name, phone_number, health_card_number);
    
    res.send({});
});




module.exports = infoRouter;