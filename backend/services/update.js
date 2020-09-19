
const KEY = require('../config').KEY;
const client = require('./database').client;



const jwt = require('jsonwebtoken');

const update = (email, first_name,last_name, password, phone_number, health_card_number) => client.query(
    'INSERT INTO users(email, first_name, last_name, phone_number,health_card_number) VALUES ($1,$2,$3,$4,$5)',
    [email,first_name,last_name,password,phone_number,health_card_number]
)
    .then(res => true)
    .catch(e => e);



module.exports = {
    update:update
}
