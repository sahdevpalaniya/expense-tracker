const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
const session = require('express-session')
const routes = require('./routes/index.routes');
const { connectDB } = require('./config/db.config');
const { seedData } = require("./seed/index");

connectDB().then(() => {
    console.log('MongoDB Connection Successfully');

    seedData()
    .then(() => console.log('Seed successfully'))
    .catch((err) => console.error('Error inserting data:', err));
    
}).catch((error) => {
    console.log('Connect DB Error', error);
});

// Ensure this line is included
app.use(express.json());

app.use(session({
    secret: 'f19496d86f493422c768eec04fb8a06fca17234cb50a523fb0d466c7b810b5db246977a8de8abd81f03f8f7c',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10
    }
}));

const corsOptions = {
    origin: '*', // only allow this origin
    methods: '*',
    allowedHeaders: '*',
};

app.use(cors(corsOptions));



app.use('/', routes);

app.listen(process.env.APP_PORT, () => {
    console.log(`your node app running at ${process.env.APP_URL}`)
})