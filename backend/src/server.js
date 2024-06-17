import express from 'express';
require("dotenv").config();
import dbConnect from './config/database';
import initRoutes from './routes/index';

const app = express();
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
dbConnect();
initRoutes(app);


app.use('/', (req, res) => { res.send('SERVER ON') })

app.listen(port, () => {
    console.log('server is running ', port)
})
