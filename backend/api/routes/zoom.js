const express = require('express');
const zoomRouter = express.Router();
const querystring = require('querystring');
const {CLIENT_ID} = require("../../config");
const {CLIENT_SECRET} = require("../../config");
var request = require("request");

zoomRouter.get('/create',async (req,res)=>{
    let code= req.query.code;
    console.log(code);
    console.log(CLIENT_ID + ':' + CLIENT_SECRET);
    var authOptions = {
        method: 'POST',
        url: 'https://zoom.us/oauth/token',
        qs: {
            grant_type: 'authorization_code',
            //The code below is a sample authorization code. Replace it with your actual authorization code while making requests.
            code: code,
            //The uri below is a sample redirect_uri. Replace it with your actual redirect_uri while making requests.
            redirect_uri: 'http://134.209.168.108:3000/zoom/create/'
        },
        headers: {
            /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
             **/
            Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        }

    };
    request(authOptions, function(error, response, body) {
        let token = JSON.parse(body).access_token
        console.log(token);
        const meetOptions = {
            method:"POST",
            url:"https://api.zoom.us/v2/users/me/meetings",
            headers: {
                Authorization: "Bearer "+token
            },
            json:{
                "topic": "appointment",
                "start_time": "2020-09-19T10:50:00Z",
                "duration": "30",
                // "schedule_for": "string",
                "timezone": "UTC",
                "password": "nithin",
                "agenda": "Checkup",
                "settings": {
                    "host_video": "true",
                    "participant_video": "true",
                    "join_before_host": "true",
                    "mute_upon_entry": "true",
                    "enforce_login": "true",
                    "registrants_email_notification": "boolean"
                }
            }

        };
        request(meetOptions,function(error,response,body){
            console.log(body);
            console.log(error);

        });
    });


});

module.exports=zoomRouter;
