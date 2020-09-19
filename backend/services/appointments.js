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
function createMeeting(body,start_time,doctor_email,email){
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
            'INSERT INTO appointments (start, finish, timed, color, doctor_email, details, name, start_url, join_url,password,email) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            [body.start,body.finish,body.timed,body.color,body.doctor_email,body.details,body.name,body.start_url,body.join_url,pwd,email]
        )




    });
}

module.exports = {
    createMeeting:createMeeting
}
