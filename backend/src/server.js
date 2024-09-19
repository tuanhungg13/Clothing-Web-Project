const express = require('express');
require("dotenv").config();
const dbConnect = require("./config/database")
const initRoutes = require('./routes/index');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

const corsOptions = {
    origin: process.env.REACT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dbConnect();
app.use(cookieParser())
initRoutes(app);

// app.listen(process.env.PORT, () => {
//     console.log('server is running ', process.env.PORT)
// })
app.listen(process.env.PORT_LOCAL, () => {
    console.log('server is running ', process.env.PORT_LOCAL)
})
