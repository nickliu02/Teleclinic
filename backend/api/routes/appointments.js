const express = require('express');
const checkAuth = require('./middleware/check-auth');
const appointmentRouter = express.Router();

const {createMeeting,isDoctor,getDoctor,getPatient} = require('../../services/appointments');
appointmentRouter.post('/add',checkAuth,async (req,res)=>{
    const {start_time,doctor_email} =req.body;
    createMeeting(req.body, start_time,doctor_email,req.userData);
    res.status(200);
});
appointmentRouter.get('/get',checkAuth,async (req,res)=>{
    //Check if it's doctor. If it's doctor, do where statement
    const value = await isDoctor(req.userData);
    if (value.exists == true){
        //Do doctor
    }
    else{
        //Do pateint
    }
});
appointmentRouter.post('/delete',checkAuth,async (req,res)=>{



});

module.exports=appointmentRouter;
