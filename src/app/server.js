// SERVER
const https = require('http');

// Required External Modules
const express = require('express');
const bodyParser = require('body-parser');

// App Variables
const app = express();

const server = https.createServer(app)
 const port = process.env.PORT || 3000;

//  Activate Server
server.listen(port, () => {
    console.log(`Listening to requests on ${port}`);
  })

//   App configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Allowing Cors
app.use((req, res, next) => {
    res.setHeader( "Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type: 'multipart/form-data', Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
 });

 module.exports = app