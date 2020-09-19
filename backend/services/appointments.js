const client = require('./database').client;
const {retrive_zoom_auth} = require('./auth');
function make_password(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function createMeeting(start_time,doctor_email){
    const token = retrieve_zoom_auth(doctor_email);
    const pwd=make_password(6);
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
            password: pwd,
            agenda: "Checkup",
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: true,
                mute_upon_entry: true,
                enforce_login: false,
                registrants_email_notification: true
            }
        }

    };
    request(meetOptions,function(error,response,body){
        let data = JSON.parse(body);

        // data.start_url
        client.query(
            'INSERT ',
            []
        )




    });
}

module.exports = {
    assignCode: assignCode
}
