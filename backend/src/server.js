import express from 'express';
require("dotenv").config();
import dbConnect from './config/database';
import initRoutes from './routes/index';
import cookieParser from 'cookie-parser'

const app = express();
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
dbConnect();
app.use(cookieParser())
initRoutes(app);

app.listen(port, () => {
    console.log('server is running ', port)
})
