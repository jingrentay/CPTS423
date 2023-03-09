import express from 'express'
import bodyParser from 'body-parser'
import mongoose, { mongo } from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import projectRoutes from './routes/project.js'
import accountRoutes from './routes/account.js'

const app = express();
dotenv.config()

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/projects', projectRoutes);
app.use('/accounts', accountRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));



