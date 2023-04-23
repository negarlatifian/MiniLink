const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.nwwi9ow.mongodb.net/minilink?retryWrites=true&w=majority`
);

//require the route
app.use('/', require('./routes/urlRoute'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
