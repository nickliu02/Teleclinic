const client = require('./database').client;
const {retrieve_zoom_auth} = require('./auth');
const nodemailer = require('nodemailer');
const request = require('request');
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
            start_time: new Date(start_time).toISOString().split(".")[0]+"Z",
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
        //send_email(,email)


    });
}
function send_email(from,to){
    let transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: 'af1053a81e73b9',
            pass: '275fdf28508932'
        }
    });
    const message = {
        from: 'elonmusk@tesla.com', // Sender address
        to: 'to@email.com',         // List of recipients
        subject: 'Design Your Model S | Tesla', // Subject line
        text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info,"nithns mail");
        }
    });
}



const isDoctor = (email) => client.query(
    'SELECT EXISTS(SELECT 1 from doctors where email = $1)',
    [email]
)
    .then(res => res.rows[0].exists)
    .catch(e => e);

const getDoctor = (email) => client.query(
    'SELECT * FROM appointments WHERE doctor_email = $1 ORDER BY start,finish',
    [email]
)
    .then(res => res.rows[0])
    .catch(e => e);

const getPatient = (email) => client.query(
    'SELECT * FROM appointsments WHERE email = $1 ORDER BY start,finish',
    [email]
)
    .then(res => res.rows[0])
    .catch(e => e);

module.exports = {
    createMeeting:createMeeting,
    isDoctor:isDoctor,
    getDoctor:getDoctor,
    getPatient:getPatient
}
