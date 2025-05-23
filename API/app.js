const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const routes = require('./routes/routes');

const app = express();
const port = 3000;

// Allow all origins
app.use(cors());

// Connexion à MongoDB 
connectDB();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})