const express = require('express');
const update = require('../../services/update').update;

const checkAuth = require('./middleware/check-auth');

const updateRouter = express.Router();

updateRouter.post('/', checkAuth, async (req,res,next)=>{
    const {first_name, last_name, phone_number,health_card_number} = req.body;

    await update(req.userData, first_name, last_name, phone_number, health_card_number);
    
    res.send({});
});




module.exports = updateRouter;