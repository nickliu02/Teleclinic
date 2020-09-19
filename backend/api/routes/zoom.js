var request = require("request");

var options = {
    method: 'POST',
    url: 'https://zoom.us/oauth/token',
    qs: {
        grant_type: 'authorization_code',
        //The code below is a sample authorization code. Replace it with your actual authorization code while making requests.
        code: 'B1234558uQ',
        //The uri below is a sample redirect_uri. Replace it with your actual redirect_uri while making requests.
        redirect_uri: 'https://abcd.ngrok.io'
    },
    headers: {
        /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
         **/
        Authorization: 'Basic abcdsdkjfesjfg'
    }
};

request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
