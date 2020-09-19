
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Logging

const app = express();

//Routes
const authRoutes = require('./api/routes/auth');
const zoomRoutes = require('./api/routes/zoom')

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
var corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "api.zhehaizhang.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Initialize routes
app.use('/auth',authRoutes);
app.use('/zoom',zoomRoutes);


//Errors
app.use((req,res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})


module.exports = app;