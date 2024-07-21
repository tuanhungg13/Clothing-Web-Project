import express from 'express';
require("dotenv").config();
import dbConnect from './config/database';
import initRoutes from './routes/index';
import cookieParser from 'cookie-parser';
import cors from "cors";
import bodyParser from 'body-parser';

const app = express();

const corsOptions = {
    origin: process.env.REACT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions))

const port = process.env.PORT || 8888;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dbConnect();
app.use(cookieParser())
initRoutes(app);

app.listen(port, () => {
    console.log('server is running ', port)
})
