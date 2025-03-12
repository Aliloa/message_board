//Logique métier

const Message = require('../models/Message');

// Logique pour récuperer tous les messages
exports.getMessages = async (req, res) => {
    try {
        // Récupérer tous les messages depuis la collection
        const messages = await Message.find();
        res.json(messages); // Réponse brute au format JSON
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des messages');
    }
};

exports.createMessage = async (req, res) => {
    try {
        const { texte, auteur, date, x, y } = req.body; // Récupérer les données envoyées

        // Vérifier si toutes les données nécessaires sont présentes
        if (!texte || !auteur || !date || x === undefined || y === undefined) {
            return res.status(400).json({ error: "Tous les champs sont requis." });
        }

        // Créer une nouvelle instance du modèle Message
        const newMessage = new Message({ texte, auteur, date, x, y });

        // Sauvegarder dans la base de données
        await newMessage.save();

        res.status(201).json({ message: "Message enregistré avec succès !" });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de l'enregistrement du message." });
    }
}