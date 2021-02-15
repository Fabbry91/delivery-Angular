const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const { dbConnect } = require('./db/config');

const app = express();

dbConnect();

app.use(morgan(`dev`));
//app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use(require('./routes/routes'));


app.listen((process.env.PORT), () => {
    console.log(`Server on port ${process.env.PORT}`);
});