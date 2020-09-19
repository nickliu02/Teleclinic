import { Client } from 'pg';
import { connectionString } from '../config';
const client = new Client({
    connectionString
});

client.connect()
    .then(() => console.log('connected to db'))
    .catch(e => console.log(e));