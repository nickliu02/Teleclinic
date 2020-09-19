const express = require('express');
const register = require('../../services/auth').register;
const login = require('../../services/auth').login;


const authRouter = express.Router();

authRouter.post('/register',(req,res,next)=>{
    const {email, first_name, last_name, password, phone_number,health_card_number} = req.body;

    const token = register(email, first_name, last_name, password, phone_number, health_card_number);
    
    res.send({accessToken: token});
});

authRouter.get('/register',(req,res,next)=>{
    
    res.send({accessToken: "success"});
});

authRouter.post('/login', (req,res,next) => {

    const { email, password } = req.body;
    console.log(email,password);

    const token = login("santaclaus@gmail.com", "hohoho");

    res.send({accessToken: token});
});

module.exports = authRouter;