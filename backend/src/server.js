import express from 'express';
require("dotenv").config();
import dbConnect from './config/database';
import initRoutes from './routes/index';
import cookieParser from 'cookie-parser'

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
dbConnect();
app.use(cookieParser())
initRoutes(app);

app.listen(port, () => {
    console.log('server is running ', port)
})
