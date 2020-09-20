const express = require('express');
const checkAuth = require('./middleware/check-auth');
const appointmentRouter = express.Router();

const {createMeeting,isDoctor,getDoctor,getPatient,deleteAppointment,getTimes} = require('../../services/appointments');
appointmentRouter.post('/add',checkAuth,async (req,res)=>{
    const {start,doctor_email} =req.body;
    console.log(doctor_email,"doctor")
    await createMeeting(req.body, start,doctor_email,req.userData);
    res.status(200);
});
appointmentRouter.get('/get',checkAuth,async (req,res)=>{
    //Check if it's doctor. If it's doctor, do where statement
    const value = await isDoctor(req.userData);
    console.log(value, "this is the doctor truth value");
    if (value == true){
        //Do doctor
        const infos = await getDoctor(req.userData);
        console.log(infos);
        res.send(infos);
    }
    else{
        //Do pateint
        const infos = await getPatient(req.userData);
        res.send(infos);
    }
});
appointmentRouter.post('/delete',checkAuth,async (req,res)=>{
    const {appointment_id} = req.body;
    await deleteAppointment(appointment_id);
    res.status(200);


});

appointmentRouter.get('/getTimes',checkAuth,async (req,res)=>{
    const infos = await getTimes();
    res.send(infos);
    
});

module.exports=appointmentRouter;
