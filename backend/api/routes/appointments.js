const express = require('express');
const appointmentRouter = express.Router();
const {retrieve_zoom_auth} = require('../../services/auth')
const {createMeeting} = require('../../services/appointments');
appointmentRouter.post('/add',async (req,res)=>{
    const {start_time,doctor_email} =req.body;
    createMeeting(req.body, start_time,doctor_email,req.userData);



});
appointmentRouter.get('/get',async (req,res)=>{

});

module.exports=scheduleRouter;
