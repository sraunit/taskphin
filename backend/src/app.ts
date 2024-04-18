import express from 'express'   
import router from './router'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Cors from 'cors';
import 'dotenv/config';
const app = express()
app.use(Cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5000
app.use(router)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
mongoose.connect("mongodb://127.0.0.1:27017/Editor");
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})