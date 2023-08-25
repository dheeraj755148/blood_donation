const express = require('express');
const app = express()
const cors = require('cors');
const bodyParser = require("body-parser");
const routes = require("./routes");
const morgan = require("morgan");

const mongoose = require('mongoose');

app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

const port = 9000;


const connec_url = "mongodb+srv://admin:84pN1ItLCw8hTecU@cluster0.1aci9.mongodb.net/bloodDonation?retryWrites=true&w=majority"
mongoose.connect(connec_url, {}, (err) =>{
    if (err) {
        console.log(err.message);
        throw err;
      }
      console.log(`mongodb server started...`);
})

app.use(routes);

app.listen(port, ()=>console.log(`Listening at: ${port}`))

module.exports = app;

