const express = require('express');
const register = require('../../services/auth').register;
const login = require('../../services/auth').login;
const isDoctor = require('../../services/appointments').isDoctor;


const authRouter = express.Router();

authRouter.post('/register',async (req,res,next)=>{
    const {email, first_name, last_name, password, phone_number,health_card_number} = req.body;
    const token = await register(email, first_name, last_name, password, phone_number, health_card_number);

    res.send({accessToken: token});
});



authRouter.post('/login', async (req,res,next) => {

    const { email, password } = req.body;

    const token = await login(email,password);
    const boo = await isDoctor(email);
    res.send({accessToken: token,isDoctor:boo});
});

module.exports = authRouter;
