const express = require('express');
const appointmentRouter = express.Router();
const {retrieve_zoom_auth} = require('../../services/auth')

appointmentRouter.post('/create',async (req,res)=>{
    const {start_time,doctor_email} =req.body;
    token = retrieve_zoom_auth(doctor_email);
    createMeeting(token,start_time);



});
appointmentRouter.get('/list',async (req,res)=>{

});

module.exports=scheduleRouter;
