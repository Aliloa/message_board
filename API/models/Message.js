const mongoose = require('mongoose');

// Schéma et modèle de message
const messageSchema = new mongoose.Schema({
  texte: { type: String, required: true },
  auteur: { type: String, required: true },
  date: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true } 
});

module.exports = mongoose.model('Message', messageSchema, 'Messages');