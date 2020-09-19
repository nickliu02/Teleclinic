const express = require('express');
const register = require('../../services/auth').register;
const login = require('../../services/auth').login;


const authRouter = express.Router();

authRouter.post('/register',async (req,res,next)=>{
    const {email, first_name, last_name, password, phone_number,health_card_number} = req.body;

    const token = await register(email, first_name, last_name, password, phone_number, health_card_number);
    
    res.send({accessToken: token});
});

authRouter.get('/register',async (req,res,next)=>{
    
    res.send({accessToken: "success"});
});

authRouter.get('/login', async (req,res,next) => {

    const { email, password } = req.body;
    console.log(email,password);

    const token = await login("santaclaus@gmail.com", "hohoho");

    res.send({accessToken: token});
});

module.exports = authRouter;