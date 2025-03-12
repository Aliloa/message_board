//ici c'est le fichier qui sert la connection à la bdd

const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
const connectDB = async () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log('Connexion à MongoDB réussie');
        }).catch(err => {
            console.log('Erreur de connexion à MongoDB:', err);
        });
}

module.exports = connectDB;