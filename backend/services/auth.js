import {KEY} from '../config.js';
import { client } from './database.service';

const jwt = require('jsonwebtoken');

export const register = (email, fullname, password, phone, healthcard) => client.query(
    'INSERT INTO users(email, first_name, last_name, password, health_card_number) VALUES ($1,$2,$3,$4,$5) RETURNING email',
    [email,first_name,last_name,password,health_card_number]
)
    .then(res => generateToken(res.rows[0].email))
    .catch(e => e);

export const generateToken = (email) => jwt.sign(
    { email: email},
    KEY,
    {expiresIn: "24h"}
);