const express = require('express')
const cors =require('cors');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://negarl:hackday2022@cluster0.65pgd.mongodb.net/minilink?retryWrites=true&w=majority")

//require the route
app.use('/', require('./routes/urlRoute'))
 

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});