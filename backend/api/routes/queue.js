const express = require('express');
const checkAuth = require('./middleware/check-auth');
const queueRouter = express.Router();

const {createMeeting,isDoctor,getDoctor,getPatient,deleteAppointment,getTimes} = require('../../services/queue');
queueRouter.post('/add',checkAuth,async (req,res)=>{
    const {start,doctor_email} =req.body;
    await createMeeting(req.body, start,doctor_email,req.userData);
    res.status(200).json({
        "fd":"fd"
    });
});
queueRouter.get('/get',checkAuth,async (req,res)=>{
    //Check if it's doctor. If it's doctor, do where statement
    const value = await isDoctor(req.userData);
    if (value == true){
        //Do doctor
        const infos = await getDoctor(req.userData);
        res.send(infos);
    }
    else{
        //Do pateint
        const infos = await getPatient(req.userData);
        res.send(infos);
    }
});





queueRouter.post('/delete',checkAuth,async (req,res)=>{
    const {appointment_id} = req.body;
    await deleteAppointment(appointment_id);
    res.status(200).json({
        "poop":"sdf"
    });


});

queueRouter.get('/getTimes',checkAuth,async (req,res)=>{
    const infos = await getTimes();
    res.send(infos);
    
});

module.exports=queueRouter;
