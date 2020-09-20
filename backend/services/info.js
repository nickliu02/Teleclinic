
const KEY = require('../config').KEY;
const client = require('./database').client;



const jwt = require('jsonwebtoken');

const update = (email, first_name,last_name, phone_number, health_card_number) => client.query(
    'UPDATE users SET first_name = $2, last_name = $3, phone_number = $4,health_card_number = $5 WHERE email = $1',
    [email,first_name,last_name,phone_number,health_card_number]
)
    .then(res => true)
    .catch(e => e);

const profile = (email) => client.query(
    'SELECT email,first_name,last_name,phone_number,health_card_number FROM users WHERE email = $1',
    [email]
)
    .then(res => res.rows[0])
    .catch(e => e);


module.exports = {
    update:update,
    profile:profile
}
