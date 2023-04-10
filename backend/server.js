const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;
const uri = process.env.DB;

const authRoute = require('./routes/user');
const foodInfoRoute = require('./routes/foodinfo')
//Route
app.use(cors());
app.use(express.json());

app.use('/', authRoute);
app.use('/', foodInfoRoute);
//DB connection setup
mongoose.connect(uri)
.then(() => console.log("DB connected successfully"))
.catch( (error) =>  { console.log(" DB connection unsuccesful " , error) });


app.listen(port, () => {
    console.log(`Running on port : ${port}`);
})