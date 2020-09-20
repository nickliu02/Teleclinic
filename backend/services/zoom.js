const {CLIENT_ID} = require("../config");
const {CLIENT_SECRET} = require("../config");
const client = require('./database').client;
const request = require("request");


let tokenRefresher = setInterval(function () {
    client.query(
        'SELECT refresh_token FROM doctors WHERE email = $1',["kathrikai30201094@gmail.com"]
    
    )
        .then(res => createRefreshToken(res.rows[0].refresh_token,"kathrikai30201094@gmail.com")
        )
        .catch(e => e);


}, 60*1000*30);
function assignCode(code,email) {
    console.log("code",code);
    var authOptions = {

        method: 'POST',
        url: 'https://zoom.us/oauth/token',
        qs: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://teleclinic.netlify.app/'
        },
        headers: {
            /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
             **/
            Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        }

    };
    request(authOptions,function(error,response,body){
        console.log("body", body);
        let data = JSON.parse(body)
        let token = data.access_token;
        let auth_token = data.refresh_token;
        console.log("token",token);
        client.query(
            'UPDATE doctors SET zoomauth = $1, refresh_token = $2 WHERE email = $3',
            [token,auth_token,email]
        )
        // add query that takes token and assigns it to the email.
        //client.query()

    });
}
function createRefreshToken(refreshToken,email){
    var authOptions = {

        method: 'POST',
        url: 'https://zoom.us/oauth/token',
        qs: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            redirect_uri: 'http://teleclinic.netlify.app/'
        },
        headers: {
            /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
             **/
            Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        }

    };
    request(authOptions,function(error,response,body){
        console.log("body", body);
        let token = JSON.parse(body).access_token;
        console.log("token",token);
        client.query(
            'UPDATE doctors SET zoomauth = $1, refresh_token=$2 WHERE email = $3',
            [token,refreshToken,email]
        )
        // add query that takes token and assigns it to the email.
        //client.query()

    });

}


module.exports = {
    assignCode: assignCode
}
