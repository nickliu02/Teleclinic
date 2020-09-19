const express = require('express');
const scheduleRouter = express.Router();
const {getToken} = require('../../services/')
scheduleRouter.post('/create',async (req,res)=>{
    const {start_time,doctor_email} =req.body;
    token =

    request(authOptions, function(error, response, body) {
        let token = JSON.parse(body).access_token;
        console.log(token);
        const meetOptions = {
            method:"POST",
            url:"https://api.zoom.us/v2/users/me/meetings",
            headers: {
                Authorization: "Bearer "+token,
                "Content-Type":"application/json"
            },
            json:{
                topic: "appointment",
                start_time: start_time,
                duration: 30,
                timezone: "UTC",
                password: "nithin",
                agenda: "Checkup",
                settings: {
                    host_video: true,
                    participant_video: true,
                    join_before_host: false,
                    mute_upon_entry: true,
                    enforce_login: false,
                    registrants_email_notification: true
                }
            }

        };
        request(meetOptions,function(error,response,body){
            console.log(body);

        });
    });


});

module.exports=scheduleRouter;
