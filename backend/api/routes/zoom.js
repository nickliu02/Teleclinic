import express from 'express';
export const zoomRouter = express.Router();
const querystring = require('querystring');
zoomRouter.get('/create',async (req,res)=>{
    let code= req.query.code;
    console.log(code)


});
