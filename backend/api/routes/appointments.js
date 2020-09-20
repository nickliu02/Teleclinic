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
    console.log(value, "this is the doctor truth value");
    if (value.exists == true){
        //Do doctor
        const infos = await getDoctor(req.userData);
        res.send(infos);
    }
    else{
        //Do pateint
        const infos = await getPatient(req.userData);
        console.log(infos);
        res.send(infos);
    }
});
appointmentRouter.post('/delete',checkAuth,async (req,res)=>{



});

module.exports=appointmentRouter;
