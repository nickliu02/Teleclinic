const { Client } = require('pg');
const { connectionString } = require( '../config');
const client = new Client({
    connectionString
});

client.connect()
    .then(() => console.log('connected to db'))
    .catch(e => console.log(e));